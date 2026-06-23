/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Logger from '../common/util/Logger';
import CalculateUtil from '../common/util/CalculateUtil';
import CheckEmptyUtil from '../common/util/CheckEmptyUtil';
import CalcRecordManager from '../common/util/CalcRecordManager';
import keysModel from '../viewmodel/PresskeysViewModel';
import { PressKeysBean } from '../viewmodel/PressKeysItem';
import { CommonConstants, Symbol } from '../common/constants/CommonConstants';
import router from '@ohos.router';
import { ThemeManager, ThemeType } from '../common/util/ThemeManager';
import { BreakpointSystem } from '../common/util/BreakpointSystem';
import { ResponsiveAdapter } from '../common/util/ResponsiveAdapter';

@Entry
@Component
export struct HomePage {
  @State inputValue: string = '';
  @State calValue: string = '';
  @State isLogMode: boolean = false; // 是否处于log输入模式
  @State logBase: string = ''; // log的底数
  @State logNumber: string = ''; // log的真数
  @State activeInput: string = 'base'; // 当前激活的输入框：'base' 或 'number'
  @State showCursor: boolean = true; // 光标显示状态
  @StorageLink('currentTheme') currentTheme: ThemeType = ThemeType.LIGHT;
  @StorageLink('currentBreakpoint') currentBreakpoint: string = 'sm';
  private cursorTimer: number = -1; // 光标闪烁定时器
  private expressions: Array<string> = [];
  private themeManager: ThemeManager = ThemeManager.getInstance();
  private breakpointSystem: BreakpointSystem = BreakpointSystem.getInstance();
  
  // 获取当前主题颜色
  getThemeColors() {
    return this.currentTheme === ThemeType.LIGHT ? this.themeManager.getLightTheme() : this.themeManager.getDarkTheme();
  }
  
  // 判断是否为深色主题
  isDarkTheme() {
    return this.currentTheme === ThemeType.DARK;
  }

  build() {
    Column() {
      // 顶部标题栏
      Row() {
        Text('计算器')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.getThemeColors().primaryText)
          .layoutWeight(1)
        
        // 绘图按钮
        Text('📊')
          .fontSize(24)
          .margin({ right: 16 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/GraphPage' });
          })
        
        // 主题切换按钮
        Text(this.currentTheme === ThemeType.LIGHT ? '🌙' : '☀️')
          .fontSize(24)
          .margin({ right: 16 })
          .onClick(() => {
            this.themeManager.toggleTheme();
          })
        
        Text('记录')
          .fontSize(16)
          .fontColor(this.getThemeColors().accentText)
          .onClick(() => {
            router.pushUrl({ url: 'pages/RecordPage' });
          })
      }
      .width('100%')
      .height(50)
      .padding({ left: 16, right: 16 })
      .backgroundColor(this.getThemeColors().primaryBackground)
      
      // Log输入模式的特殊显示
      if (this.isLogMode) {
        Column() {
          Text('log')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor(this.getThemeColors().primaryText)
            .margin({ bottom: 10 })
          
          Row() {
            // 底数输入框
            Column() {
              Text('底数')
                .fontSize(14)
                .fontColor(this.getThemeColors().secondaryText)
              TextInput({ text: this.logBase + (this.activeInput === 'base' && this.showCursor ? '|' : '') })
                .width(80)
                .height(40)
                .fontSize(18)
                .textAlign(TextAlign.Center)
                .borderColor(this.activeInput === 'base' ? this.getThemeColors().accentColor : this.getThemeColors().secondaryText)
                .borderWidth(2)
                .backgroundColor(this.activeInput === 'base' ? (this.isDarkTheme() ? '#1A1A1A' : '#E3F2FD') : this.getThemeColors().inputBackground)
                .caretColor(this.getThemeColors().accentColor)
                .fontColor(this.getThemeColors().primaryText)
                .onClick(() => {
                  this.activeInput = 'base';
                })
                .onChange((value: string) => {
                  this.logBase = value.replace('|', '');
                })
            }
            .margin({ right: 10 })
            
            Text('(')
              .fontSize(28)
              .fontColor(this.getThemeColors().primaryText)
              .margin({ top: 20 })
            
            // 真数输入框
            Column() {
              Text('真数')
                .fontSize(14)
                .fontColor(this.getThemeColors().secondaryText)
              TextInput({ text: this.logNumber + (this.activeInput === 'number' && this.showCursor ? '|' : '') })
                .width(80)
                .height(40)
                .fontSize(18)
                .textAlign(TextAlign.Center)
                .borderColor(this.activeInput === 'number' ? this.getThemeColors().accentColor : this.getThemeColors().secondaryText)
                .borderWidth(2)
                .backgroundColor(this.activeInput === 'number' ? (this.isDarkTheme() ? '#1A1A1A' : '#E3F2FD') : this.getThemeColors().inputBackground)
                .caretColor(this.getThemeColors().accentColor)
                .fontColor(this.getThemeColors().primaryText)
                .onClick(() => {
                  this.activeInput = 'number';
                })
                .onChange((value: string) => {
                  this.logNumber = value.replace('|', '');
                })
            }
            .margin({ left: 5, right: 5 })
            
            Text(')')
              .fontSize(28)
              .fontColor(this.getThemeColors().primaryText)
              .margin({ top: 20 })
          }
          .margin({ top: 10 })
        }
        .width(CommonConstants.FULL_PERCENT)
        .height($r('app.float.input_height'))
        .justifyContent(FlexAlign.Center)
        .backgroundColor(this.getThemeColors().inputBackground)
        .margin({
          right: $r('app.float.input_margin_right'),
          top: $r('app.float.input_margin_top')
        })
      } else {
        // 正常计算器显示
        Column() {
          TextInput({ text: this.resultFormat(this.inputValue) })
            .height(CommonConstants.FULL_PERCENT)
            .fontSize(
              (this.inputValue.length > CommonConstants.INPUT_LENGTH_MAX) ?
                ResponsiveAdapter.getInputFontSize(this.currentBreakpoint) * 0.5 : 
                ResponsiveAdapter.getInputFontSize(this.currentBreakpoint)
            )
            .enabled(false)
            .fontColor(this.getThemeColors().primaryText)
            .textAlign(TextAlign.End)
            .backgroundColor(this.getThemeColors().inputBackground)
        }
        .width(CommonConstants.FULL_PERCENT)
        .height(ResponsiveAdapter.getInputHeight(this.currentBreakpoint))
        .alignItems(HorizontalAlign.End)
        .margin({
          right: $r('app.float.input_margin_right'),
          top: $r('app.float.input_margin_top')
        })
      }

      Column() {
        Text(this.resultFormat(this.calValue))
          .fontSize(ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 1.5)
          .fontColor(this.getThemeColors().accentText)
      }
      .width(CommonConstants.FULL_PERCENT)
      .height($r('app.float.text_height'))
      .alignItems(HorizontalAlign.End)
      .margin({
        right: $r('app.float.text_margin_right'),
        bottom: $r('app.float.text_margin_bottom')
      })

      Column() {
        Column() {
          ForEach(keysModel.getPressKeys(), (rowItem: Array<PressKeysBean>, rowItemIndex?: number) => {
            Row() {
              ForEach(rowItem, (keyItem: PressKeysBean, keyItemIndex?: number) => {
                Column() {
                  Column() {
                    if (keyItem.flag === 0) {
                      Image(keyItem.source !== undefined ? keyItem.source : '')
                        .width(keyItem.width)
                        .height(keyItem.height)
                    } else {
                      Text(keyItem.value)
                        .fontSize(
                          (keyItem.value === CommonConstants.DOTS) ?
                            ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 1.2 :
                            (keyItem.value === 'log') ?
                              ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 0.8 :
                              (keyItem.value === '^') ?
                                ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 1.2 :
                                (keyItem.value === '←' || keyItem.value === '→') ?
                                  ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 1.1 : 
                                  ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint)
                        )
                        .fontColor(
                          (keyItem.value === '←' || keyItem.value === '→') ?
                            this.getThemeColors().accentText : this.getThemeColors().primaryText
                        )
                        .fontWeight(
                          (keyItem.value === '←' || keyItem.value === '→') ?
                            FontWeight.Bold : FontWeight.Normal
                        )
                    }
                  }
                  .width('100%')
                  .height('100%')
                  .borderWidth(1)
                  .borderColor(this.getThemeColors().borderColor)
                  .borderRadius($r('app.float.border_radius'))
                  .backgroundColor(
                    ((rowItemIndex === (keysModel.getPressKeys().length - 1)) &&
                      (keyItemIndex === (rowItem.length - 1))) ?
                      this.getThemeColors().equalsButtonColor : this.getThemeColors().buttonBackground
                  )
                  .alignItems(HorizontalAlign.Center)
                  .justifyContent(FlexAlign.Center)
                  .onClick(() => {
                    if (keyItem.flag === 0) {
                      this.inputSymbol(keyItem.value);
                    } else {
                      // Check if the value is log - enter log mode
                      if (keyItem.value === 'log') {
                        this.isLogMode = true;
                        this.logBase = '';
                        this.logNumber = '';
                        this.activeInput = 'base';
                      } else if (keyItem.value === '^') {
                        this.inputSymbol(Symbol.POW);
                      } else if (keyItem.value === '←') {
                        // 左箭头 - 切换到底数输入框
                        if (this.isLogMode) {
                          this.activeInput = 'base';
                        }
                      } else if (keyItem.value === '→') {
                        // 右箭头 - 切换到真数输入框
                        if (this.isLogMode) {
                          this.activeInput = 'number';
                        }
                      } else {
                        this.inputNumber(keyItem.value);
                      }
                    }
                  })
                }
                .layoutWeight(1)
                .height(CommonConstants.FULL_PERCENT)
                .justifyContent(FlexAlign.Center)
                .padding({ 
                  left: ResponsiveAdapter.getButtonSpacing(this.currentBreakpoint), 
                  right: ResponsiveAdapter.getButtonSpacing(this.currentBreakpoint) 
                })
              }, (keyItem: PressKeysBean) => JSON.stringify(keyItem))
            }
            .width(CommonConstants.FULL_PERCENT)
            .layoutWeight(1)
            .justifyContent(FlexAlign.SpaceEvenly)
            .padding({ 
              top: ResponsiveAdapter.getButtonSpacing(this.currentBreakpoint), 
              bottom: ResponsiveAdapter.getButtonSpacing(this.currentBreakpoint) 
            })
          }, (item: Array<Array<PressKeysBean>>) => JSON.stringify(item))
        }
        .width(CommonConstants.FULL_PERCENT)
        .height(CommonConstants.FULL_PERCENT)
        .justifyContent(FlexAlign.SpaceEvenly)
        .margin({
          left: $r('app.float.margin_left'),
          right: $r('app.float.margin_right')
        })
      }
      .layoutWeight(1)
      .width(CommonConstants.FULL_PERCENT)
      .backgroundColor(this.getThemeColors().secondaryBackground)
    }
    .width(CommonConstants.FULL_PERCENT)
    .height(CommonConstants.FULL_PERCENT)
    .backgroundColor(this.getThemeColors().primaryBackground)
  }

  // 页面即将显示时启动光标闪烁定时器
  aboutToAppear() {
    // 确保主题管理器已初始化
    ThemeManager.getInstance();
    // 确保断点系统已初始化
    BreakpointSystem.getInstance();
    this.startCursorBlink();
  }

  // 页面即将消失时清除定时器
  aboutToDisappear() {
    if (this.cursorTimer !== -1) {
      clearInterval(this.cursorTimer);
      this.cursorTimer = -1;
    }
  }

  // 启动光标闪烁
  private startCursorBlink() {
    if (this.cursorTimer !== -1) {
      clearInterval(this.cursorTimer);
    }
    this.cursorTimer = setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 500); // 每500ms切换一次
  }


  /**
   * Input Symbols.
   *
   * @param value Input Operators.
   */
  inputSymbol(value: string) {
    if (CheckEmptyUtil.isEmpty(value)) {
      return;
    }
    
    // 如果在log模式，处理数字输入
    if (this.isLogMode) {
      switch (value) {
        case Symbol.CLEAN:
          this.isLogMode = false;
          this.logBase = '';
          this.logNumber = '';
          this.inputValue = '';
          this.calValue = '';
          this.expressions = [];
          break;
        case Symbol.DEL:
          if (this.activeInput === 'base') {
            this.logBase = this.logBase.slice(0, -1);
          } else {
            this.logNumber = this.logNumber.slice(0, -1);
          }
          break;
        case Symbol.EQU:
          // 计算log结果
          if (this.logBase && this.logNumber) {
            let result = CalculateUtil.logarithm(this.logNumber, this.logBase);
            if (isNaN(result)) {
              this.inputValue = 'Error';
            } else {
              this.inputValue = result.toFixed(6).replace(/\.?0+$/, '');
            }
            this.isLogMode = false;
            this.logBase = '';
            this.logNumber = '';
          }
          break;
        default:
          break;
      }
      return;
    }
    
    let len = this.expressions.length;
    switch (value) {
      case Symbol.CLEAN:
        this.expressions = [];
        this.calValue = '';
        break;
      case Symbol.DEL:
        this.inputDelete(len);
        break;
      case Symbol.EQU:
        if (len === 0) {
          return;
        }
        this.getResult().then((result: boolean) => {
          if (!result) {
            return;
          }
          // 保存计算记录
          let expression = this.inputValue;
          let resultValue = this.calValue;
          CalcRecordManager.getInstance().addRecord(expression + ' =', resultValue);
          this.inputValue = this.calValue;
          this.calValue = '';
          this.expressions = [];
          this.expressions.push(this.inputValue);
        })
        break;
      case Symbol.POW:
      case Symbol.LOG:
        this.inputOperators(len, value);
        break;
      default:
        this.inputOperators(len, value);
        break;
    }
    this.formatInputValue();
  }

  /**
   * Enter numbers.
   *
   * @param value Enter numbers.
   */
  inputNumber(value: string) {
    if (CheckEmptyUtil.isEmpty(value)) {
      return;
    }
    
    // 如果在log模式，将数字输入到当前激活的输入框
    if (this.isLogMode) {
      if (this.activeInput === 'base') {
        this.logBase += value;
      } else {
        this.logNumber += value;
      }
      return;
    }
    
    let len = this.expressions.length;
    let last = len > 0 ? this.expressions[len - 1] : '';
    let secondLast = len > 1 ? this.expressions[len - CommonConstants.TWO] : undefined;
    if (!this.validateEnter(last, value)) {
      return;
    }
    if (!last) {
      this.expressions.push(value);
    } else if (!secondLast) {
      this.expressions[len - 1] += value;
    }
    if (secondLast && CalculateUtil.isSymbol(secondLast)) {
      this.expressions[len -1] += value;
    }
    if (secondLast && !CalculateUtil.isSymbol(secondLast)) {
      this.expressions.push(value);
    }
    this.formatInputValue();
    if (value !== CommonConstants.DOTS) {
      this.getResult();
    }
  }

  /**
   * Verify that you can enter.
   *
   * @param last Value of the last element.
   * @param value Current input value.
   * return Indicates whether to allow input.
   */
  validateEnter(last: string, value: string) {
    if (!last && value === CommonConstants.PERCENT_SIGN) {
      return false;
    }
    if ((last === CommonConstants.MIN) && (value === CommonConstants.PERCENT_SIGN)) {
      return false;
    }
    if (last.endsWith(CommonConstants.PERCENT_SIGN)) {
      return false;
    }
    if ((last.indexOf(CommonConstants.DOTS) !== -1) && (value === CommonConstants.DOTS)) {
      return false;
    }
    if ((last === '0') && (value !== CommonConstants.DOTS) &&
      (value !== CommonConstants.PERCENT_SIGN)) {
      return false;
    }
    return true;
  }

  /**
   * Delete Key Trigger.
   *
   * @param len Expression Length.
   */
  inputDelete(len: number) {
    if (len === 0) {
      return;
    }
    let last = this.expressions[len - 1];
    let lastLen = last.length;
    if (lastLen === 1) {
      this.expressions.pop();
      len = this.expressions.length;
    } else {
      this.expressions[len - 1] = last.slice(0, last.length - 1);
    }
    if (len === 0) {
      this.inputValue = '';
      this.calValue = '';
      return;
    }
    if (!CalculateUtil.isSymbol(this.expressions[len - 1])) {
      this.getResult();
    }
  }

  /**
   * Triggered when input is added, subtracted, multiplied, and divided.
   *
   * @param len Expression Length.
   * @param value Current Input Value.
   */
  inputOperators(len: number, value: string) {
    let last = len > 0 ? this.expressions[len - 1] : undefined;
    let secondLast = len > 1 ? this.expressions[len - CommonConstants.TWO] : undefined;
    if (!last && (value === Symbol.MIN)) {
      this.expressions.push(this.getSymbol(value));
      return;
    }
    if (!last) {
      return;
    }
    if (!CalculateUtil.isSymbol(last)) {
      this.expressions.push(this.getSymbol(value));
      return;
    }
    if ((value === Symbol.MIN) &&
      (last === CommonConstants.MIN || last === CommonConstants.ADD)) {
      this.expressions.pop();
      this.expressions.push(this.getSymbol(value));
      return;
    }
    if (!secondLast) {
      return;
    }
    if (value !== Symbol.MIN) {
      this.expressions.pop();
    }
    if (CalculateUtil.isSymbol(secondLast)) {
      this.expressions.pop();
    }
    this.expressions.push(this.getSymbol(value));
  }

  /**
   * Get Operator.
   *
   * @param value.
   * @return Operators.
   */
  getSymbol(value: string) {
    if (CheckEmptyUtil.isEmpty(value)) {
      return '';
    }
    let symbol = '';
    switch (value) {
      case Symbol.ADD:
        symbol = CommonConstants.ADD;
        break;
      case Symbol.MIN:
        symbol = CommonConstants.MIN;
        break;
      case Symbol.MUL:
        symbol = CommonConstants.MUL;
        break;
      case Symbol.DIV:
        symbol = CommonConstants.DIV;
        break;
      case Symbol.POW:
        symbol = CommonConstants.POW;
        break;
      case Symbol.LOG:
        symbol = CommonConstants.LOG;
        break;
      default:
        break;
    }
    return symbol;
  }

  /**
   * Make a deep copy of an expression.
   *
   * @return deep copy expression.
   */
  deepCopy(): Array<string> {
    let copyExpressions: Array<string> = Array.from(this.expressions);
    return copyExpressions;
  }

  /**
   * Obtaining Results.
   *
   * @return Whether the result is incorrect.
   */
  async getResult() {
    let calResult = CalculateUtil.parseExpression(this.deepCopy());
    if (calResult === 'NaN') {
      this.calValue = this.resourceToString($r('app.string.error'));
      return false;
    }
    this.calValue = calResult;
    return true;
  }

  /**
   * Number Formatting.
   *
   * @param value Formatting parameters.
   * @return Thousand percentile data.
   */
  resultFormat(value: string) {
    let reg = (value.indexOf('.') > -1) ? new RegExp("/(\d)(?=(\d{3})+\.)/g") : new RegExp("/(\d)(?=(?:\d{3})+$)/g");
    return value.replace(reg, '$1,');
  }

  /**
   * Convert a resource file to a string.
   *
   * @param resource Resource file.
   * @return Character string converted from the resource file.
   */
  resourceToString(resource: Resource): string {
    if (CheckEmptyUtil.isEmpty(resource)) {
      return '';
    }
    let result = '';
    try {
      const uiContext: UIContext | undefined = AppStorage.get('uiContext');
      let context = uiContext!.getHostContext()!;
      result = context.resourceManager.getStringSync(resource.id);
    } catch (error) {
      Logger.error('[CalculateModel] getResourceString fail: ' + JSON.stringify(error))
    }
    return result;
  }

  /**
   * Thousands in the formatting result.
   */
  formatInputValue() {
    let deepExpressions: Array<string> = [];
    this.deepCopy().forEach((item: string, index: number) => {
      deepExpressions[index] = this.resultFormat(item);
    });
    this.inputValue = deepExpressions.join('');
  }
}