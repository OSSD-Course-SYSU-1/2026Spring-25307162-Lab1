if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GraphPage_Params {
    functionExpression?: string;
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    errorMessage?: string;
    canvasWidth?: number;
    canvasHeight?: number;
    currentTheme?: ThemeType;
    themeManager?: ThemeManager;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    presetFunctions?: string[];
}
import { FunctionParser } from "@bundle:com.example.simplecalculator/entry/ets/common/util/FunctionParser";
import { ThemeManager, ThemeType } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ThemeManager";
import type { ThemeColors } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ThemeManager";
export class GraphPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__functionExpression = new ObservedPropertySimplePU('x^2', this, "functionExpression");
        this.__xMin = new ObservedPropertySimplePU(-10, this, "xMin");
        this.__xMax = new ObservedPropertySimplePU(10, this, "xMax");
        this.__yMin = new ObservedPropertySimplePU(-10, this, "yMin");
        this.__yMax = new ObservedPropertySimplePU(10, this, "yMax");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.__canvasWidth = new ObservedPropertySimplePU(0, this, "canvasWidth");
        this.__canvasHeight = new ObservedPropertySimplePU(0, this, "canvasHeight");
        this.__currentTheme = this.createStorageLink('currentTheme', ThemeType.LIGHT, "currentTheme");
        this.themeManager = ThemeManager.getInstance();
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.presetFunctions = [
            'x^2', 'x^3', 'sin(x)', 'cos(x)', 'tan(x)',
            'e^x', 'ln(x)', '1/x', 'sqrt(x)', 'abs(x)',
            'sin(x)/x', 'x*sin(x)', 'x^2-4'
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GraphPage_Params) {
        if (params.functionExpression !== undefined) {
            this.functionExpression = params.functionExpression;
        }
        if (params.xMin !== undefined) {
            this.xMin = params.xMin;
        }
        if (params.xMax !== undefined) {
            this.xMax = params.xMax;
        }
        if (params.yMin !== undefined) {
            this.yMin = params.yMin;
        }
        if (params.yMax !== undefined) {
            this.yMax = params.yMax;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
        if (params.canvasWidth !== undefined) {
            this.canvasWidth = params.canvasWidth;
        }
        if (params.canvasHeight !== undefined) {
            this.canvasHeight = params.canvasHeight;
        }
        if (params.themeManager !== undefined) {
            this.themeManager = params.themeManager;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.presetFunctions !== undefined) {
            this.presetFunctions = params.presetFunctions;
        }
    }
    updateStateVars(params: GraphPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__functionExpression.purgeDependencyOnElmtId(rmElmtId);
        this.__xMin.purgeDependencyOnElmtId(rmElmtId);
        this.__xMax.purgeDependencyOnElmtId(rmElmtId);
        this.__yMin.purgeDependencyOnElmtId(rmElmtId);
        this.__yMax.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__canvasWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__canvasHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTheme.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__functionExpression.aboutToBeDeleted();
        this.__xMin.aboutToBeDeleted();
        this.__xMax.aboutToBeDeleted();
        this.__yMin.aboutToBeDeleted();
        this.__yMax.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__canvasWidth.aboutToBeDeleted();
        this.__canvasHeight.aboutToBeDeleted();
        this.__currentTheme.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __functionExpression: ObservedPropertySimplePU<string>; // 函数表达式
    get functionExpression() {
        return this.__functionExpression.get();
    }
    set functionExpression(newValue: string) {
        this.__functionExpression.set(newValue);
    }
    private __xMin: ObservedPropertySimplePU<number>; // x轴最小值
    get xMin() {
        return this.__xMin.get();
    }
    set xMin(newValue: number) {
        this.__xMin.set(newValue);
    }
    private __xMax: ObservedPropertySimplePU<number>; // x轴最大值
    get xMax() {
        return this.__xMax.get();
    }
    set xMax(newValue: number) {
        this.__xMax.set(newValue);
    }
    private __yMin: ObservedPropertySimplePU<number>; // y轴最小值
    get yMin() {
        return this.__yMin.get();
    }
    set yMin(newValue: number) {
        this.__yMin.set(newValue);
    }
    private __yMax: ObservedPropertySimplePU<number>; // y轴最大值
    get yMax() {
        return this.__yMax.get();
    }
    set yMax(newValue: number) {
        this.__yMax.set(newValue);
    }
    private __errorMessage: ObservedPropertySimplePU<string>; // 错误信息
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    private __canvasWidth: ObservedPropertySimplePU<number>; // 画布宽度
    get canvasWidth() {
        return this.__canvasWidth.get();
    }
    set canvasWidth(newValue: number) {
        this.__canvasWidth.set(newValue);
    }
    private __canvasHeight: ObservedPropertySimplePU<number>; // 画布高度
    get canvasHeight() {
        return this.__canvasHeight.get();
    }
    set canvasHeight(newValue: number) {
        this.__canvasHeight.set(newValue);
    }
    private __currentTheme: ObservedPropertyAbstractPU<ThemeType>;
    get currentTheme() {
        return this.__currentTheme.get();
    }
    set currentTheme(newValue: ThemeType) {
        this.__currentTheme.set(newValue);
    }
    private themeManager: ThemeManager;
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    // 预设函数列表
    private presetFunctions: string[];
    // 获取当前主题颜色
    getThemeColors() {
        return this.currentTheme === ThemeType.LIGHT ? this.themeManager.getLightTheme() : this.themeManager.getDarkTheme();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(this.getThemeColors().primaryBackground);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.height(50);
            // 标题栏
            Row.padding({ left: 16, right: 16 });
            // 标题栏
            Row.backgroundColor(this.getThemeColors().primaryBackground);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('函数绘图');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.getThemeColors().primaryText);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 重置按钮
            Button.createWithLabel('重置');
            // 重置按钮
            Button.fontSize(14);
            // 重置按钮
            Button.backgroundColor(this.getThemeColors().buttonBackground);
            // 重置按钮
            Button.fontColor(this.getThemeColors().primaryText);
            // 重置按钮
            Button.onClick(() => {
                this.xMin = -10;
                this.xMax = 10;
                this.yMin = -10;
                this.yMax = 10;
            });
        }, Button);
        // 重置按钮
        Button.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 函数输入区域
            Column.create();
            // 函数输入区域
            Column.width('100%');
            // 函数输入区域
            Column.padding({ top: 10, bottom: 10 });
            // 函数输入区域
            Column.backgroundColor(this.getThemeColors().secondaryBackground);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('f(x) = ');
            Text.fontSize(18);
            Text.fontColor(this.getThemeColors().primaryText);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.functionExpression });
            TextInput.layoutWeight(1);
            TextInput.height(40);
            TextInput.fontSize(18);
            TextInput.fontColor(this.getThemeColors().primaryText);
            TextInput.backgroundColor(this.getThemeColors().inputBackground);
            TextInput.caretColor(this.getThemeColors().accentColor);
            TextInput.onChange((value: string) => {
                this.functionExpression = value;
                this.errorMessage = '';
            });
            TextInput.onSubmit(() => {
                this.validateAndDraw();
            });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 错误信息
            if (this.errorMessage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(14);
                        Text.fontColor('#FF0000');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 函数输入区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 预设函数按钮
            Scroll.create();
            // 预设函数按钮
            Scroll.width('100%');
            // 预设函数按钮
            Scroll.height(50);
            // 预设函数按钮
            Scroll.scrollable(ScrollDirection.Horizontal);
            // 预设函数按钮
            Scroll.scrollBar(BarState.Off);
            // 预设函数按钮
            Scroll.backgroundColor(this.getThemeColors().secondaryBackground);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const func = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(func);
                    Button.fontSize(12);
                    Button.height(32);
                    Button.margin({ right: 8 });
                    Button.backgroundColor(this.functionExpression === func ?
                        this.getThemeColors().accentColor : this.getThemeColors().buttonBackground);
                    Button.fontColor(this.functionExpression === func ?
                        '#FFFFFF' : this.getThemeColors().primaryText);
                    Button.onClick(() => {
                        this.functionExpression = func;
                        this.errorMessage = '';
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.presetFunctions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        // 预设函数按钮
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 绘图区域
            Stack.create();
            // 绘图区域
            Stack.layoutWeight(1);
            // 绘图区域
            Stack.width('100%');
            // 绘图区域
            Stack.backgroundColor(this.getThemeColors().inputBackground);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(this.context);
            Canvas.width('100%');
            Canvas.height('100%');
            Canvas.backgroundColor(this.getThemeColors().inputBackground);
            Canvas.onReady(() => {
                this.onCanvasReady();
            });
            Canvas.onAreaChange((oldValue: Area, newValue: Area) => {
                this.canvasWidth = Number(newValue.width);
                this.canvasHeight = Number(newValue.height);
            });
        }, Canvas);
        Canvas.pop();
        // 绘图区域
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 控制按钮区域
            Row.create();
            // 控制按钮区域
            Row.width('100%');
            // 控制按钮区域
            Row.height(60);
            // 控制按钮区域
            Row.padding({ left: 16, right: 16 });
            // 控制按钮区域
            Row.backgroundColor(this.getThemeColors().secondaryBackground);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 缩放控制
            Column.create();
            // 缩放控制
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('放大');
            Button.fontSize(14);
            Button.width(70);
            Button.backgroundColor(this.getThemeColors().buttonBackground);
            Button.fontColor(this.getThemeColors().primaryText);
            Button.onClick(() => this.zoom(0.8));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('缩小');
            Button.fontSize(14);
            Button.width(70);
            Button.margin({ left: 10 });
            Button.backgroundColor(this.getThemeColors().buttonBackground);
            Button.fontColor(this.getThemeColors().primaryText);
            Button.onClick(() => this.zoom(1.25));
        }, Button);
        Button.pop();
        Row.pop();
        // 缩放控制
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 平移控制
            Column.create();
            // 平移控制
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('←');
            Button.fontSize(14);
            Button.width(50);
            Button.backgroundColor(this.getThemeColors().buttonBackground);
            Button.fontColor(this.getThemeColors().primaryText);
            Button.onClick(() => this.pan(-1, 0));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('↑');
            Button.fontSize(14);
            Button.width(50);
            Button.margin({ left: 10 });
            Button.backgroundColor(this.getThemeColors().buttonBackground);
            Button.fontColor(this.getThemeColors().primaryText);
            Button.onClick(() => this.pan(0, 1));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('↓');
            Button.fontSize(14);
            Button.width(50);
            Button.margin({ left: 10 });
            Button.backgroundColor(this.getThemeColors().buttonBackground);
            Button.fontColor(this.getThemeColors().primaryText);
            Button.onClick(() => this.pan(0, -1));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('→');
            Button.fontSize(14);
            Button.width(50);
            Button.margin({ left: 10 });
            Button.backgroundColor(this.getThemeColors().buttonBackground);
            Button.fontColor(this.getThemeColors().primaryText);
            Button.onClick(() => this.pan(1, 0));
        }, Button);
        Button.pop();
        Row.pop();
        // 平移控制
        Column.pop();
        // 控制按钮区域
        Row.pop();
        Column.pop();
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
            if (Math.abs(x) < 0.0001)
                continue; // 跳过原点
            const px = this.xToPixel(x);
            const label = this.formatNumber(x);
            ctx.fillText(label, px - 10, y0 + 15);
        }
        // Y轴刻度
        const yStart = Math.ceil(this.yMin / gridStep) * gridStep;
        for (let y = yStart; y <= this.yMax; y += gridStep) {
            if (Math.abs(y) < 0.0001)
                continue; // 跳过原点
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
            }
            else {
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
        }
        else if (normalized < 3) {
            step = 2 * magnitude;
        }
        else if (normalized < 7) {
            step = 5 * magnitude;
        }
        else {
            step = 10 * magnitude;
        }
        return step;
    }
    // 格式化数字
    private formatNumber(num: number): string {
        if (Math.abs(num) < 0.0001)
            return '0';
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GraphPage";
    }
}
registerNamedRoute(() => new GraphPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/GraphPage", pageFullPath: "entry/src/main/ets/pages/GraphPage", integratedHsp: "false", moduleType: "followWithHap" });
