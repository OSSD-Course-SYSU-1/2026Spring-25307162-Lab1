import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { UIContext, window } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BreakpointSystem } from '../common/util/BreakpointSystem';

export default class EntryAbility extends UIAbility {
  private breakpointSystem: BreakpointSystem = BreakpointSystem.getInstance();

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    
    // 检查是否为接续启动
    if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
      hilog.info(0x0000, 'testTag', '%{public}s', 'Ability launched by continuation');
    }
  }

  onDestroy() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    // 注销断点监听
    this.breakpointSystem.unregister();
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
    windowStage.loadContent('pages/HomePage', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');

      let uiContext: UIContext | undefined = windowStage.getMainWindowSync().getUIContext()
      AppStorage.setOrCreate('uiContext', uiContext);
      
      // 注册断点监听（仅在非预览器环境下）
      try {
        this.breakpointSystem.register(windowStage.getMainWindowSync());
      } catch (err) {
        hilog.warn(0x0000, 'testTag', 'Breakpoint system not supported in previewer: %{public}s', JSON.stringify(err));
        // 预览器环境下设置默认断点
        AppStorage.setOrCreate<string>('currentBreakpoint', 'sm');
      }
    });
  }

  onWindowStageDestroy() {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground() {
    // Ability has brought to foreground
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground() {
    // Ability has back to background
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }

  /**
   * 应用接续 - 保存数据
   * 当应用从一个设备迁移到另一个设备时调用
   */
  onContinue(wantParam: Record<string, Object>): AbilityConstant.OnContinueResult {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onContinue');
    
    try {
      // 保存当前输入数据
      let inputValue = AppStorage.get<string>('inputValue') ?? '';
      let calValue = AppStorage.get<string>('calValue') ?? '';
      
      wantParam['inputValue'] = inputValue;
      wantParam['calValue'] = calValue;
      
      return AbilityConstant.OnContinueResult.AGREE;
    } catch (err) {
      hilog.error(0x0000, 'testTag', 'onContinue failed: %{public}s', JSON.stringify(err));
      return AbilityConstant.OnContinueResult.REJECT;
    }
  }

  /**
   * 应用接续 - 恢复数据
   * 当应用在新设备上启动时调用（如果是接续启动）
   */
  onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam) {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onNewWant');
    
    // 检查是否为接续启动
    if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
      hilog.info(0x0000, 'testTag', '%{public}s', 'Restoring data from continuation');
      
      // 恢复接续数据
      if (want.parameters) {
        let inputValue = want.parameters['inputValue'] as string;
        let calValue = want.parameters['calValue'] as string;
        
        AppStorage.setOrCreate('inputValue', inputValue);
        AppStorage.setOrCreate('calValue', calValue);
      }
      
      // 恢复窗口
      this.context.restoreWindowStage(new LocalStorage());
    }
  }
}
