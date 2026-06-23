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

import CalcRecordManager, { CalcRecord } from '../common/util/CalcRecordManager';
import router from '@ohos.router';
import { ThemeManager, ThemeType } from '../common/util/ThemeManager';

@Entry
@Component
export struct RecordPage {
  @State records: CalcRecord[] = [];
  @StorageLink('currentTheme') currentTheme: ThemeType = ThemeType.LIGHT;
  private themeManager: ThemeManager = ThemeManager.getInstance();
  
  // 获取当前主题颜色
  getThemeColors() {
    return this.currentTheme === ThemeType.LIGHT ? this.themeManager.getLightTheme() : this.themeManager.getDarkTheme();
  }

  aboutToAppear() {
    // 确保主题管理器已初始化
    ThemeManager.getInstance();
    this.records = CalcRecordManager.getInstance().getRecords();
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('←')
          .fontSize(24)
          .fontColor(this.getThemeColors().accentText)
          .onClick(() => {
            router.back();
          })
        
        Text('计算记录')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.getThemeColors().primaryText)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Text('    ')
          .fontSize(24)
      }
      .width('100%')
      .height(56)
      .backgroundColor(this.getThemeColors().primaryBackground)
      .padding({ left: 16, right: 16 })

      // 记录列表
      if (this.records.length > 0) {
        List() {
          ForEach(this.records, (item: CalcRecord, index: number) => {
            ListItem() {
              Row() {
                Column() {
                  Text(item.expression)
                    .fontSize(16)
                    .fontColor(this.getThemeColors().primaryText)
                  Text(item.result)
                    .fontSize(20)
                    .fontColor(this.getThemeColors().accentText)
                    .fontWeight(FontWeight.Bold)
                    .margin({ top: 4 })
                }
                .alignItems(HorizontalAlign.Start)
                .layoutWeight(1)
              }
              .width('100%')
              .padding({ left: 16, right: 16, top: 12, bottom: 12 })
              .backgroundColor(this.getThemeColors().primaryBackground)
            }
          }, (item: CalcRecord) => item.timestamp.toString())
        }
        .layoutWeight(1)
        .width('100%')
        .backgroundColor(this.getThemeColors().secondaryBackground)
        .divider({ strokeWidth: 1, color: this.getThemeColors().dividerColor })
      } else {
        Column() {
          Text('暂无计算记录')
            .fontSize(16)
            .fontColor(this.getThemeColors().secondaryText)
        }
        .layoutWeight(1)
        .width('100%')
        .backgroundColor(this.getThemeColors().secondaryBackground)
        .justifyContent(FlexAlign.Center)
      }

      // 底部按钮
      Row() {
        Button('清空记录')
          .width('90%')
          .height(44)
          .fontSize(16)
          .fontColor(Color.White)
          .backgroundColor('#FF4444')
          .onClick(() => {
            CalcRecordManager.getInstance().clearRecords();
            this.records = [];
          })
      }
      .width('100%')
      .height(70)
      .backgroundColor(this.getThemeColors().primaryBackground)
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.getThemeColors().secondaryBackground)
  }
}
