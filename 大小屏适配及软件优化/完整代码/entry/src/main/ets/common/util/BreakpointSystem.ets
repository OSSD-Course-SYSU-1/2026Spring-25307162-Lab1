/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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

import window from '@ohos.window';

/**
 * 断点配置接口
 */
interface BreakpointConfig {
  name: string;
  size: number;
}

/**
 * 断点系统工具类
 * 用于实现响应式布局，适配不同屏幕尺寸的设备
 */
export class BreakpointSystem {
  private static instance: BreakpointSystem;
  private currentBreakpoint: string = 'sm';
  private windowClass: window.Window | undefined = undefined;
  private windowSizeChangeCallback: ((size: window.Size) => void) | undefined = undefined;

  // 断点配置
  private breakpoints: BreakpointConfig[] = [
    { name: 'xs', size: 0 },      // 超小屏（0-320vp）
    { name: 'sm', size: 320 },    // 小屏（320-600vp）- 手机竖屏
    { name: 'md', size: 600 },    // 中屏（600-840vp）- 折叠屏展开/平板竖屏
    { name: 'lg', size: 840 }     // 大屏（840vp+）- 平板横屏/PC
  ];

  private constructor() {}

  /**
   * 获取单例实例
   */
  static getInstance(): BreakpointSystem {
    if (!BreakpointSystem.instance) {
      BreakpointSystem.instance = new BreakpointSystem();
    }
    return BreakpointSystem.instance;
  }

  /**
   * 注册断点监听
   * @param windowClass 窗口对象
   */
  public register(windowClass: window.Window): void {
    try {
      this.windowClass = windowClass;
      
      // 获取初始窗口尺寸并计算断点
      const windowProperties = windowClass.getWindowProperties();
      const initialWidth = windowProperties.windowRect.width;
      const initialBreakpoint = this.calculateBreakpoint(initialWidth);
      this.updateCurrentBreakpoint(initialBreakpoint);
      
      // 监听窗口尺寸变化
      this.windowSizeChangeCallback = (size: window.Size) => {
        const newWidth = size.width;
        const newBreakpoint = this.calculateBreakpoint(newWidth);
        this.updateCurrentBreakpoint(newBreakpoint);
      };
      windowClass.on('windowSizeChange', this.windowSizeChangeCallback);
      
      console.info('[BreakpointSystem] Window size change listener registered');
    } catch (err) {
      console.error(`[BreakpointSystem] Failed to register: ${JSON.stringify(err)}`);
      // 失败时设置默认断点
      this.updateCurrentBreakpoint('sm');
    }
  }

  /**
   * 注销断点监听
   */
  public unregister(): void {
    if (this.windowClass && this.windowSizeChangeCallback) {
      this.windowClass.off('windowSizeChange', this.windowSizeChangeCallback);
      console.info('[BreakpointSystem] Window size change listener unregistered');
    }
  }

  /**
   * 根据窗口宽度计算断点
   * @param width 窗口宽度（px）
   */
  private calculateBreakpoint(width: number): string {
    // 简单的px到vp转换（假设density为2）
    const widthVp = width / 2;
    
    for (let i = this.breakpoints.length - 1; i >= 0; i--) {
      if (widthVp >= this.breakpoints[i].size) {
        return this.breakpoints[i].name;
      }
    }
    return 'xs';
  }

  /**
   * 更新当前断点
   * @param breakpoint 新的断点值
   */
  private updateCurrentBreakpoint(breakpoint: string): void {
    if (this.currentBreakpoint !== breakpoint) {
      this.currentBreakpoint = breakpoint;
      // 同步到AppStorage供全局使用
      AppStorage.setOrCreate<string>('currentBreakpoint', this.currentBreakpoint);
      console.info(`[BreakpointSystem] Breakpoint changed to: ${this.currentBreakpoint}`);
    }
  }

  /**
   * 获取当前断点
   */
  public getCurrentBreakpoint(): string {
    return this.currentBreakpoint;
  }

  /**
   * 判断是否为大屏设备
   */
  public isLargeScreen(): boolean {
    return this.currentBreakpoint === 'lg' || this.currentBreakpoint === 'md';
  }

  /**
   * 判断是否为小屏设备
   */
  public isSmallScreen(): boolean {
    return this.currentBreakpoint === 'sm' || this.currentBreakpoint === 'xs';
  }
}

/**
 * 断点类型工具类
 * 用于根据不同断点返回不同的值
 */
export class BreakpointType<T> {
  private options: Record<string, T>;

  constructor(options: Record<string, T>) {
    this.options = options;
  }

  /**
   * 根据断点获取对应的值
   * @param breakpoint 当前断点
   */
  getValue(breakpoint: string): T | undefined {
    return this.options[breakpoint];
  }
}
