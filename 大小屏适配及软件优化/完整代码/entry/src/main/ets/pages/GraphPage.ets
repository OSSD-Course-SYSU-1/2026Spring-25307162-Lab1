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

import { FunctionParser } from '../common/util/FunctionParser';
import { ThemeManager, ThemeType, ThemeColors } from '../common/util/ThemeManager';

@Entry
@Component
export struct GraphPage {
  @State functionExpression: string = 'x^2'; // 函数表达式
  @State xMin: number = -10; // x轴最小值
  @State xMax: number = 10; // x轴最大值
  @State yMin: number = -10; // y轴最小值
  @State yMax: number = 10; // y轴最大值
  @State errorMessage: string = ''; // 错误信息
  @State canvasWidth: number = 0; // 画布宽度
  @State canvasHeight: number = 0; // 画布高度
  @StorageLink('currentTheme') currentTheme: ThemeType = ThemeType.LIGHT;
  private themeManager: ThemeManager = ThemeManager.getInstance();
  private settings: RenderingContextSettings = new RenderingContextSettings(true);
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);
  
  // 预设函数列表
  private presetFunctions: string[] = [
    'x^2', 'x^3', 'sin(x)', 'cos(x)', 'tan(x)',
    'e^x', 'ln(x)', '1/x', 'sqrt(x)', 'abs(x)',
    'sin(x)/x', 'x*sin(x)', 'x^2-4'
  ];

  // 获取当前主题颜色
  getThemeColors() {
    return this.currentTheme === ThemeType.LIGHT ? this.themeManager.getLightTheme() : this.themeManager.getDarkTheme();
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('函数绘图')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.getThemeColors().primaryText)
          .layoutWeight(1)
        
        // 重置按钮
        Button('重置')
          .fontSize(14)
          .backgroundColor(this.getThemeColors().buttonBackground)
          .fontColor(this.getThemeColors().primaryText)
          .onClick(() => {
            this.xMin = -10;
            this.xMax = 10;
            this.yMin = -10;
            this.yMax = 10;
          })
      }
      .width('100%')
      .height(50)
      .padding({ left: 16, right: 16 })
      .backgroundColor(this.getThemeColors().primaryBackground)
      
      // 函数输入区域
      Column() {
        Row() {
          Text('f(x) = ')
            .fontSize(18)
            .fontColor(this.getThemeColors().primaryText)
          
          TextInput({ text: this.functionExpression })
            .layoutWeight(1)
            .height(40)
            .fontSize(18)
            .fontColor(this.getThemeColors().primaryText)
            .backgroundColor(this.getThemeColors().inputBackground)
            .caretColor(this.getThemeColors().accentColor)
            .onChange((value: string) => {
              this.functionExpression = value;
              this.errorMessage = '';
            })
            .onSubmit(() => {
              this.validateAndDraw();
            })
        }
        .width('100%')
        .padding({ left: 16, right: 16 })
        
        // 错误信息
        if (this.errorMessage) {
          Text(this.errorMessage)
            .fontSize(14)
            .fontColor('#FF0000')
            .margin({ top: 8 })
        }
      }
      .width('100%')
      .padding({ top: 10, bottom: 10 })
      .backgroundColor(this.getThemeColors().secondaryBackground)
      
      // 预设函数按钮
      Scroll() {
        Row() {
          ForEach(this.presetFunctions, (func: string) => {
            Button(func)
              .fontSize(12)
              .height(32)
              .margin({ right: 8 })
              .backgroundColor(this.functionExpression === func ? 
                this.getThemeColors().accentColor : this.getThemeColors().buttonBackground)
              .fontColor(this.functionExpression === func ? 
                '#FFFFFF' : this.getThemeColors().primaryText)
              .onClick(() => {
                this.functionExpression = func;
                this.errorMessage = '';
              })
          })
        }
        .padding({ left: 16, right: 16 })
      }
      .width('100%')
      .height(50)
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
      .backgroundColor(this.getThemeColors().secondaryBackground)
      
      // 绘图区域
      Stack() {
        Canvas(this.context)
          .width('100%')
          .height('100%')
          .backgroundColor(this.getThemeColors().inputBackground)
          .onReady(() => {
            this.onCanvasReady();
          })
          .onAreaChange((oldValue: Area, newValue: Area) => {
            this.canvasWidth = Number(newValue.width);
            this.canvasHeight = Number(newValue.height);
          })
      }
      .layoutWeight(1)
      .width('100%')
      .backgroundColor(this.getThemeColors().inputBackground)
      
      // 控制按钮区域
      Row() {
        // 缩放控制
        Column() {
          Row() {
            Button('放大')
              .fontSize(14)
              .width(70)
              .backgroundColor(this.getThemeColors().buttonBackground)
              .fontColor(this.getThemeColors().primaryText)
              .onClick(() => this.zoom(0.8))
            
            Button('缩小')
              .fontSize(14)
              .width(70)
              .margin({ left: 10 })
              .backgroundColor(this.getThemeColors().buttonBackground)
              .fontColor(this.getThemeColors().primaryText)
              .onClick(() => this.zoom(1.25))
          }
        }
        .layoutWeight(1)
        
        // 平移控制
        Column() {
          Row() {
            Button('←')
              .fontSize(14)
              .width(50)
              .backgroundColor(this.getThemeColors().buttonBackground)
              .fontColor(this.getThemeColors().primaryText)
              .onClick(() => this.pan(-1, 0))
            
            Button('↑')
              .fontSize(14)
              .width(50)
              .margin({ left: 10 })
              .backgroundColor(this.getThemeColors().buttonBackground)
              .fontColor(this.getThemeColors().primaryText)
              .onClick(() => this.pan(0, 1))
            
            Button('↓')
              .fontSize(14)
              .width(50)
              .margin({ left: 10 })
              .backgroundColor(this.getThemeColors().buttonBackground)
              .fontColor(this.getThemeColors().primaryText)
              .onClick(() => this.pan(0, -1))
            
            Button('→')
              .fontSize(14)
              .width(50)
              .margin({ left: 10 })
              .backgroundColor(this.getThemeColors().buttonBackground)
              .fontColor(this.getThemeColors().primaryText)
              .onClick(() => this.pan(1, 0))
          }
        }
        .layoutWeight(1)
      }
      .width('100%')
      .height(60)
      .padding({ left: 16, right: 16 })
      .backgroundColor(this.getThemeColors().secondaryBackground)
    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.getThemeColors().primaryBackground)
  }

  // 画布准备就绪
  private onCanvasReady() {
    this.drawGraph();
  }

  // 验证并绘制
  private validateAndDraw() {
    if (!FunctionParser.validate(this.functionExpression)) {
      this.errorMessage = '无效的函数表达式';
      return;
    }
    this.errorMessage = '';
    this.drawGraph();
  }

  // 绘制图形
  private drawGraph() {
    if (this.canvasWidth <= 0 || this.canvasHeight <= 0) {
      return;
    }
    
    const colors = this.getThemeColors();
    const ctx = this.context;
    
    // 清空画布
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // 绘制背景
    ctx.fillStyle = colors.inputBackground;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // 绘制网格
    this.drawGrid(ctx, colors);
    
    // 绘制坐标轴
    this.drawAxes(ctx, colors);
    
    // 绘制函数曲线
    this.drawFunction(ctx, colors);
  }

  // 绘制网格
  private drawGrid(ctx: CanvasRenderingContext2D, colors: ThemeColors) {
    ctx.strokeStyle = colors.borderColor;
    ctx.lineWidth = 0.5;
    
    // 计算网格间距
    const xRange = this.xMax - this.xMin;
    const yRange = this.yMax - this.yMin;
    const gridStep = this.calculateGridStep(xRange);
    
    // 绘制垂直网格线
    const xStart = Math.ceil(this.xMin / gridStep) * gridStep;
    for (let x = xStart; x <= this.xMax; x += gridStep) {
      const px = this.xToPixel(x);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, this.canvasHeight);
      ctx.stroke();
    }
    
    // 绘制水平网格线
    const yStart = Math.ceil(this.yMin / gridStep) * gridStep;
    for (let y = yStart; y <= this.yMax; y += gridStep) {
      const py = this.yToPixel(y);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(this.canvasWidth, py);
      ctx.stroke();
    }
  }

  // 绘制坐标轴
  private drawAxes(ctx: CanvasRenderingContext2D, colors: ThemeColors) {
    ctx.strokeStyle = colors.primaryText;
    ctx.lineWidth = 2;
    
    // X轴
    const y0 = this.yToPixel(0);
    if (y0 >= 0 && y0 <= this.canvasHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(this.canvasWidth, y0);
      ctx.stroke();
    }
    
    // Y轴
    const x0 = this.xToPixel(0);
    if (x0 >= 0 && x0 <= this.canvasWidth) {
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, this.canvasHeight);
      ctx.stroke();
    }
    
    // 绘制刻度标签
    ctx.fillStyle = colors.secondaryText;
    ctx.font = '12px sans-serif';
    
    const xRange = this.xMax - this.xMin;
    const gridStep = this.calculateGridStep(xRange);
    
    // X轴刻度
    const xStart = Math.ceil(this.xMin / gridStep) * gridStep;
    for (let x = xStart; x <= this.xMax; x += gridStep) {
      if (Math.abs(x) < 0.0001) continue; // 跳过原点
      const px = this.xToPixel(x);
      const label = this.formatNumber(x);
      ctx.fillText(label, px - 10, y0 + 15);
    }
    
    // Y轴刻度
    const yStart = Math.ceil(this.yMin / gridStep) * gridStep;
    for (let y = yStart; y <= this.yMax; y += gridStep) {
      if (Math.abs(y) < 0.0001) continue; // 跳过原点
      const py = this.yToPixel(y);
      const label = this.formatNumber(y);
      ctx.fillText(label, x0 + 5, py + 4);
    }
    
    // 原点标签
    ctx.fillText('O', x0 + 5, y0 + 15);
  }

  // 绘制函数曲线
  private drawFunction(ctx: CanvasRenderingContext2D, colors: ThemeColors) {
    const points = FunctionParser.generatePoints(this.functionExpression, this.xMin, this.xMax, 400);
    
    ctx.strokeStyle = colors.accentColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    let isDrawing = false;
    const maxJump = (this.yMax - this.yMin) * 0.5; // 最大允许跳跃
    
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const px = this.xToPixel(point.x);
      const py = this.yToPixel(point.y);
      
      // 检查点是否有效
      if (isNaN(point.y) || !isFinite(point.y) || py < -100 || py > this.canvasHeight + 100) {
        if (isDrawing) {
          ctx.stroke();
          ctx.beginPath();
          isDrawing = false;
        }
        continue;
      }
      
      // 检查是否有大跳跃（不连续点）
      if (i > 0 && isDrawing) {
        const prevPoint = points[i - 1];
        if (!isNaN(prevPoint.y) && isFinite(prevPoint.y)) {
          const jump = Math.abs(point.y - prevPoint.y);
          if (jump > maxJump) {
            ctx.stroke();
            ctx.beginPath();
            isDrawing = false;
          }
        }
      }
      
      if (!isDrawing) {
        ctx.moveTo(px, py);
        isDrawing = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    
    if (isDrawing) {
      ctx.stroke();
    }
  }

  // 坐标转换：x值转像素
  private xToPixel(x: number): number {
    return (x - this.xMin) / (this.xMax - this.xMin) * this.canvasWidth;
  }

  // 坐标转换：y值转像素
  private yToPixel(y: number): number {
    return (this.yMax - y) / (this.yMax - this.yMin) * this.canvasHeight;
  }

  // 计算网格间距
  private calculateGridStep(range: number): number {
    const idealSteps = 10;
    const rawStep = range / idealSteps;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const normalized = rawStep / magnitude;
    
    let step: number;
    if (normalized < 1.5) {
      step = magnitude;
    } else if (normalized < 3) {
      step = 2 * magnitude;
    } else if (normalized < 7) {
      step = 5 * magnitude;
    } else {
      step = 10 * magnitude;
    }
    
    return step;
  }

  // 格式化数字
  private formatNumber(num: number): string {
    if (Math.abs(num) < 0.0001) return '0';
    if (Math.abs(num) >= 1000 || Math.abs(num) < 0.01) {
      return num.toExponential(1);
    }
    return num.toFixed(Math.abs(num) < 1 ? 2 : 1);
  }

  // 缩放
  private zoom(factor: number) {
    const xCenter = (this.xMin + this.xMax) / 2;
    const yCenter = (this.yMin + this.yMax) / 2;
    const xRange = (this.xMax - this.xMin) * factor / 2;
    const yRange = (this.yMax - this.yMin) * factor / 2;
    
    this.xMin = xCenter - xRange;
    this.xMax = xCenter + xRange;
    this.yMin = yCenter - yRange;
    this.yMax = yCenter + yRange;
    
    this.drawGraph();
  }

  // 平移
  private pan(dx: number, dy: number) {
    const xStep = (this.xMax - this.xMin) * 0.2;
    const yStep = (this.yMax - this.yMin) * 0.2;
    
    this.xMin += dx * xStep;
    this.xMax += dx * xStep;
    this.yMin += dy * yStep;
    this.yMax += dy * yStep;
    
    this.drawGraph();
  }

  // 页面即将显示
  aboutToAppear() {
    ThemeManager.getInstance();
  }
}
