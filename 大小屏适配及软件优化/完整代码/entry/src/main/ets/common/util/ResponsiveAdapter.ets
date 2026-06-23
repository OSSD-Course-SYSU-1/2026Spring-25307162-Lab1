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

import { BreakpointType } from './BreakpointSystem';

/**
 * 响应式布局适配器
 * 提供不同断点下的UI参数配置
 */
export class ResponsiveAdapter {
  /**
   * 获取标题栏高度
   */
  static getTitleHeight(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 44;
      case 'sm':
        return 50;
      case 'md':
        return 56;
      case 'lg':
        return 64;
      default:
        return 50;
    }
  }

  /**
   * 获取标题字体大小
   */
  static getTitleFontSize(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 18;
      case 'sm':
        return 20;
      case 'md':
        return 22;
      case 'lg':
        return 24;
      default:
        return 20;
    }
  }

  /**
   * 获取输入框高度
   */
  static getInputHeight(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 100;
      case 'sm':
        return 120;
      case 'md':
        return 140;
      case 'lg':
        return 160;
      default:
        return 120;
    }
  }

  /**
   * 获取输入字体大小
   */
  static getInputFontSize(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 32;
      case 'sm':
        return 36;
      case 'md':
        return 40;
      case 'lg':
        return 48;
      default:
        return 36;
    }
  }

  /**
   * 获取按钮字体大小
   */
  static getButtonFontSize(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 18;
      case 'sm':
        return 20;
      case 'md':
        return 24;
      case 'lg':
        return 28;
      default:
        return 20;
    }
  }

  /**
   * 获取按钮高度
   */
  static getButtonHeight(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 56;
      case 'sm':
        return 64;
      case 'md':
        return 80;
      case 'lg':
        return 96;
      default:
        return 64;
    }
  }

  /**
   * 获取内容区padding
   */
  static getContentPadding(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 8;
      case 'sm':
        return 12;
      case 'md':
        return 16;
      case 'lg':
        return 24;
      default:
        return 12;
    }
  }

  /**
   * 获取按钮间距
   */
  static getButtonSpacing(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 4;
      case 'sm':
        return 6;
      case 'md':
        return 10;
      case 'lg':
        return 14;
      default:
        return 6;
    }
  }

  /**
   * 获取计算器列数
   * 小屏4列，大屏可以保持4列或调整为更多
   */
  static getCalculatorColumns(currentBreakpoint: string): number {
    // 计算器通常保持4列布局
    return 4;
  }

  /**
   * 获取是否显示侧边栏
   * 大屏设备可以显示侧边栏
   */
  static shouldShowSidebar(currentBreakpoint: string): boolean {
    return currentBreakpoint === 'lg';
  }

  /**
   * 获取是否使用分栏布局
   */
  static shouldUseSplitLayout(currentBreakpoint: string): boolean {
    return currentBreakpoint === 'md' || currentBreakpoint === 'lg';
  }

  /**
   * 获取窗口最大内容宽度
   * 大屏设备限制最大宽度，避免内容过宽
   */
  static getMaxContentWidth(currentBreakpoint: string): string {
    switch (currentBreakpoint) {
      case 'xs':
        return '100%';
      case 'sm':
        return '100%';
      case 'md':
        return '600vp';
      case 'lg':
        return '800vp';
      default:
        return '100%';
    }
  }

  /**
   * 获取边距
   */
  static getMargin(currentBreakpoint: string): number {
    switch (currentBreakpoint) {
      case 'xs':
        return 8;
      case 'sm':
        return 12;
      case 'md':
        return 16;
      case 'lg':
        return 24;
      default:
        return 12;
    }
  }
}
