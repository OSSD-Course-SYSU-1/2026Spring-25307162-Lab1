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

import { HomePage } from './HomePage';
import { RecordPage } from './RecordPage';
import { GraphPage } from './GraphPage';
import { ThemeManager, ThemeType } from '../common/util/ThemeManager';

@Entry
@Component
struct MainPage {
  @State currentIndex: number = 0;
  @StorageLink('currentTheme') currentTheme: ThemeType = ThemeType.LIGHT;
  private themeManager: ThemeManager = ThemeManager.getInstance();
  
  // 获取当前主题颜色
  getThemeColors() {
    return this.currentTheme === ThemeType.LIGHT ? this.themeManager.getLightTheme() : this.themeManager.getDarkTheme();
  }

  @Builder
  tabBarBuilder(title: string, index: number) {
    Column() {
      Text(title)
        .fontSize(16)
        .fontColor(this.currentIndex === index ? 
          this.getThemeColors().navActiveText : 
          this.getThemeColors().navInactiveText)
        .fontWeight(this.currentIndex === index ? FontWeight.Bold : FontWeight.Normal)
    }
    .layoutWeight(1)
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.currentIndex = index;
    })
  }

  build() {
    Column() {
      // 内容区域
      if (this.currentIndex === 0) {
        HomePage()
          .layoutWeight(1)
      } else if (this.currentIndex === 1) {
        RecordPage()
          .layoutWeight(1)
      } else {
        GraphPage()
          .layoutWeight(1)
      }

      // 底部导航栏
      Row() {
        this.tabBarBuilder('计算器', 0)
        Divider()
          .vertical(true)
          .height(30)
          .color(this.getThemeColors().dividerColor)
        this.tabBarBuilder('记录', 1)
        Divider()
          .vertical(true)
          .height(30)
          .color(this.getThemeColors().dividerColor)
        this.tabBarBuilder('绘图', 2)
        
        // 主题切换按钮
        Divider()
          .vertical(true)
          .height(30)
          .color(this.getThemeColors().dividerColor)
        
        Column() {
          Text(this.currentTheme === ThemeType.LIGHT ? '🌙' : '☀️')
            .fontSize(20)
        }
        .width(60)
        .height('100%')
        .justifyContent(FlexAlign.Center)
        .onClick(() => {
          this.themeManager.toggleTheme();
        })
      }
      .width('100%')
      .height(56)
      .backgroundColor(this.getThemeColors().navBackground)
      .border({ width: { top: 1 }, color: this.getThemeColors().dividerColor })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.getThemeColors().primaryBackground)
  }
}
