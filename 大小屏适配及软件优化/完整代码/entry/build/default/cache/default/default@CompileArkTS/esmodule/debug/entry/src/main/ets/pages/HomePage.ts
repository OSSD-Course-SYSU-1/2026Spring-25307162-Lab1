if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    inputValue?: string;
    calValue?: string;
    isLogMode?: boolean;
    logBase?: string;
    logNumber?: string;
    activeInput?: string;
    showCursor?: boolean;
    currentTheme?: ThemeType;
    currentBreakpoint?: string;
    cursorTimer?: number;
    expressions?: Array<string>;
    themeManager?: ThemeManager;
    breakpointSystem?: BreakpointSystem;
}
import Logger from "@bundle:com.example.simplecalculator/entry/ets/common/util/Logger";
import CalculateUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CalculateUtil";
import CheckEmptyUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CheckEmptyUtil";
import CalcRecordManager from "@bundle:com.example.simplecalculator/entry/ets/common/util/CalcRecordManager";
import keysModel from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PresskeysViewModel";
import type { PressKeysBean } from '../viewmodel/PressKeysItem';
import { CommonConstants, Symbol } from "@bundle:com.example.simplecalculator/entry/ets/common/constants/CommonConstants";
import router from "@ohos:router";
import { ThemeManager, ThemeType } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ThemeManager";
import { BreakpointSystem } from "@bundle:com.example.simplecalculator/entry/ets/common/util/BreakpointSystem";
import { ResponsiveAdapter } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ResponsiveAdapter";
export class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__inputValue = new ObservedPropertySimplePU('', this, "inputValue");
        this.__calValue = new ObservedPropertySimplePU('', this, "calValue");
        this.__isLogMode = new ObservedPropertySimplePU(false, this, "isLogMode");
        this.__logBase = new ObservedPropertySimplePU('', this, "logBase");
        this.__logNumber = new ObservedPropertySimplePU('', this, "logNumber");
        this.__activeInput = new ObservedPropertySimplePU('base', this, "activeInput");
        this.__showCursor = new ObservedPropertySimplePU(true, this, "showCursor");
        this.__currentTheme = this.createStorageLink('currentTheme', ThemeType.LIGHT, "currentTheme");
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', 'sm', "currentBreakpoint");
        this.cursorTimer = -1;
        this.expressions = [];
        this.themeManager = ThemeManager.getInstance();
        this.breakpointSystem = BreakpointSystem.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.calValue !== undefined) {
            this.calValue = params.calValue;
        }
        if (params.isLogMode !== undefined) {
            this.isLogMode = params.isLogMode;
        }
        if (params.logBase !== undefined) {
            this.logBase = params.logBase;
        }
        if (params.logNumber !== undefined) {
            this.logNumber = params.logNumber;
        }
        if (params.activeInput !== undefined) {
            this.activeInput = params.activeInput;
        }
        if (params.showCursor !== undefined) {
            this.showCursor = params.showCursor;
        }
        if (params.cursorTimer !== undefined) {
            this.cursorTimer = params.cursorTimer;
        }
        if (params.expressions !== undefined) {
            this.expressions = params.expressions;
        }
        if (params.themeManager !== undefined) {
            this.themeManager = params.themeManager;
        }
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__calValue.purgeDependencyOnElmtId(rmElmtId);
        this.__isLogMode.purgeDependencyOnElmtId(rmElmtId);
        this.__logBase.purgeDependencyOnElmtId(rmElmtId);
        this.__logNumber.purgeDependencyOnElmtId(rmElmtId);
        this.__activeInput.purgeDependencyOnElmtId(rmElmtId);
        this.__showCursor.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTheme.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__calValue.aboutToBeDeleted();
        this.__isLogMode.aboutToBeDeleted();
        this.__logBase.aboutToBeDeleted();
        this.__logNumber.aboutToBeDeleted();
        this.__activeInput.aboutToBeDeleted();
        this.__showCursor.aboutToBeDeleted();
        this.__currentTheme.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __inputValue: ObservedPropertySimplePU<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __calValue: ObservedPropertySimplePU<string>;
    get calValue() {
        return this.__calValue.get();
    }
    set calValue(newValue: string) {
        this.__calValue.set(newValue);
    }
    private __isLogMode: ObservedPropertySimplePU<boolean>; // 是否处于log输入模式
    get isLogMode() {
        return this.__isLogMode.get();
    }
    set isLogMode(newValue: boolean) {
        this.__isLogMode.set(newValue);
    }
    private __logBase: ObservedPropertySimplePU<string>; // log的底数
    get logBase() {
        return this.__logBase.get();
    }
    set logBase(newValue: string) {
        this.__logBase.set(newValue);
    }
    private __logNumber: ObservedPropertySimplePU<string>; // log的真数
    get logNumber() {
        return this.__logNumber.get();
    }
    set logNumber(newValue: string) {
        this.__logNumber.set(newValue);
    }
    private __activeInput: ObservedPropertySimplePU<string>; // 当前激活的输入框：'base' 或 'number'
    get activeInput() {
        return this.__activeInput.get();
    }
    set activeInput(newValue: string) {
        this.__activeInput.set(newValue);
    }
    private __showCursor: ObservedPropertySimplePU<boolean>; // 光标显示状态
    get showCursor() {
        return this.__showCursor.get();
    }
    set showCursor(newValue: boolean) {
        this.__showCursor.set(newValue);
    }
    private __currentTheme: ObservedPropertyAbstractPU<ThemeType>;
    get currentTheme() {
        return this.__currentTheme.get();
    }
    set currentTheme(newValue: ThemeType) {
        this.__currentTheme.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private cursorTimer: number; // 光标闪烁定时器
    private expressions: Array<string>;
    private themeManager: ThemeManager;
    private breakpointSystem: BreakpointSystem;
    // 获取当前主题颜色
    getThemeColors() {
        return this.currentTheme === ThemeType.LIGHT ? this.themeManager.getLightTheme() : this.themeManager.getDarkTheme();
    }
    // 判断是否为深色主题
    isDarkTheme() {
        return this.currentTheme === ThemeType.DARK;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height(CommonConstants.FULL_PERCENT);
            Column.backgroundColor(this.getThemeColors().primaryBackground);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题栏
            Row.create();
            // 顶部标题栏
            Row.width('100%');
            // 顶部标题栏
            Row.height(50);
            // 顶部标题栏
            Row.padding({ left: 16, right: 16 });
            // 顶部标题栏
            Row.backgroundColor(this.getThemeColors().primaryBackground);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('计算器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.getThemeColors().primaryText);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 绘图按钮
            Text.create('📊');
            // 绘图按钮
            Text.fontSize(24);
            // 绘图按钮
            Text.margin({ right: 16 });
            // 绘图按钮
            Text.onClick(() => {
                router.pushUrl({ url: 'pages/GraphPage' });
            });
        }, Text);
        // 绘图按钮
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主题切换按钮
            Text.create(this.currentTheme === ThemeType.LIGHT ? '🌙' : '☀️');
            // 主题切换按钮
            Text.fontSize(24);
            // 主题切换按钮
            Text.margin({ right: 16 });
            // 主题切换按钮
            Text.onClick(() => {
                this.themeManager.toggleTheme();
            });
        }, Text);
        // 主题切换按钮
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('记录');
            Text.fontSize(16);
            Text.fontColor(this.getThemeColors().accentText);
            Text.onClick(() => {
                router.pushUrl({ url: 'pages/RecordPage' });
            });
        }, Text);
        Text.pop();
        // 顶部标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Log输入模式的特殊显示
            if (this.isLogMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(CommonConstants.FULL_PERCENT);
                        Column.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor(this.getThemeColors().inputBackground);
                        Column.margin({
                            right: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                            top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('log');
                        Text.fontSize(24);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(this.getThemeColors().primaryText);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 底数输入框
                        Column.create();
                        // 底数输入框
                        Column.margin({ right: 10 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('底数');
                        Text.fontSize(14);
                        Text.fontColor(this.getThemeColors().secondaryText);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.logBase + (this.activeInput === 'base' && this.showCursor ? '|' : '') });
                        TextInput.width(80);
                        TextInput.height(40);
                        TextInput.fontSize(18);
                        TextInput.textAlign(TextAlign.Center);
                        TextInput.borderColor(this.activeInput === 'base' ? this.getThemeColors().accentColor : this.getThemeColors().secondaryText);
                        TextInput.borderWidth(2);
                        TextInput.backgroundColor(this.activeInput === 'base' ? (this.isDarkTheme() ? '#1A1A1A' : '#E3F2FD') : this.getThemeColors().inputBackground);
                        TextInput.caretColor(this.getThemeColors().accentColor);
                        TextInput.fontColor(this.getThemeColors().primaryText);
                        TextInput.onClick(() => {
                            this.activeInput = 'base';
                        });
                        TextInput.onChange((value: string) => {
                            this.logBase = value.replace('|', '');
                        });
                    }, TextInput);
                    // 底数输入框
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('(');
                        Text.fontSize(28);
                        Text.fontColor(this.getThemeColors().primaryText);
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 真数输入框
                        Column.create();
                        // 真数输入框
                        Column.margin({ left: 5, right: 5 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('真数');
                        Text.fontSize(14);
                        Text.fontColor(this.getThemeColors().secondaryText);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.logNumber + (this.activeInput === 'number' && this.showCursor ? '|' : '') });
                        TextInput.width(80);
                        TextInput.height(40);
                        TextInput.fontSize(18);
                        TextInput.textAlign(TextAlign.Center);
                        TextInput.borderColor(this.activeInput === 'number' ? this.getThemeColors().accentColor : this.getThemeColors().secondaryText);
                        TextInput.borderWidth(2);
                        TextInput.backgroundColor(this.activeInput === 'number' ? (this.isDarkTheme() ? '#1A1A1A' : '#E3F2FD') : this.getThemeColors().inputBackground);
                        TextInput.caretColor(this.getThemeColors().accentColor);
                        TextInput.fontColor(this.getThemeColors().primaryText);
                        TextInput.onClick(() => {
                            this.activeInput = 'number';
                        });
                        TextInput.onChange((value: string) => {
                            this.logNumber = value.replace('|', '');
                        });
                    }, TextInput);
                    // 真数输入框
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(')');
                        Text.fontSize(28);
                        Text.fontColor(this.getThemeColors().primaryText);
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 正常计算器显示
                        Column.create();
                        // 正常计算器显示
                        Column.width(CommonConstants.FULL_PERCENT);
                        // 正常计算器显示
                        Column.height(ResponsiveAdapter.getInputHeight(this.currentBreakpoint));
                        // 正常计算器显示
                        Column.alignItems(HorizontalAlign.End);
                        // 正常计算器显示
                        Column.margin({
                            right: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                            top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.resultFormat(this.inputValue) });
                        TextInput.height(CommonConstants.FULL_PERCENT);
                        TextInput.fontSize((this.inputValue.length > CommonConstants.INPUT_LENGTH_MAX) ?
                            ResponsiveAdapter.getInputFontSize(this.currentBreakpoint) * 0.5 :
                            ResponsiveAdapter.getInputFontSize(this.currentBreakpoint));
                        TextInput.enabled(false);
                        TextInput.fontColor(this.getThemeColors().primaryText);
                        TextInput.textAlign(TextAlign.End);
                        TextInput.backgroundColor(this.getThemeColors().inputBackground);
                    }, TextInput);
                    // 正常计算器显示
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.End);
            Column.margin({
                right: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                bottom: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultFormat(this.calValue));
            Text.fontSize(ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 1.5);
            Text.fontColor(this.getThemeColors().accentText);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.width(CommonConstants.FULL_PERCENT);
            Column.backgroundColor(this.getThemeColors().secondaryBackground);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height(CommonConstants.FULL_PERCENT);
            Column.justifyContent(FlexAlign.SpaceEvenly);
            Column.margin({
                left: { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                right: { "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, rowItemIndex?: number) => {
                const rowItem = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width(CommonConstants.FULL_PERCENT);
                    Row.layoutWeight(1);
                    Row.justifyContent(FlexAlign.SpaceEvenly);
                    Row.padding({
                        top: ResponsiveAdapter.getButtonSpacing(this.currentBreakpoint),
                        bottom: ResponsiveAdapter.getButtonSpacing(this.currentBreakpoint)
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, keyItemIndex?: number) => {
                        const keyItem = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.layoutWeight(1);
                            Column.height(CommonConstants.FULL_PERCENT);
                            Column.justifyContent(FlexAlign.Center);
                            Column.padding({
                                left: ResponsiveAdapter.getButtonSpacing(this.currentBreakpoint),
                                right: ResponsiveAdapter.getButtonSpacing(this.currentBreakpoint)
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('100%');
                            Column.height('100%');
                            Column.borderWidth(1);
                            Column.borderColor(this.getThemeColors().borderColor);
                            Column.borderRadius({ "id": 16777229, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.backgroundColor(((rowItemIndex === (keysModel.getPressKeys().length - 1)) &&
                                (keyItemIndex === (rowItem.length - 1))) ?
                                this.getThemeColors().equalsButtonColor : this.getThemeColors().buttonBackground);
                            Column.alignItems(HorizontalAlign.Center);
                            Column.justifyContent(FlexAlign.Center);
                            Column.onClick(() => {
                                if (keyItem.flag === 0) {
                                    this.inputSymbol(keyItem.value);
                                }
                                else {
                                    // Check if the value is log - enter log mode
                                    if (keyItem.value === 'log') {
                                        this.isLogMode = true;
                                        this.logBase = '';
                                        this.logNumber = '';
                                        this.activeInput = 'base';
                                    }
                                    else if (keyItem.value === '^') {
                                        this.inputSymbol(Symbol.POW);
                                    }
                                    else if (keyItem.value === '←') {
                                        // 左箭头 - 切换到底数输入框
                                        if (this.isLogMode) {
                                            this.activeInput = 'base';
                                        }
                                    }
                                    else if (keyItem.value === '→') {
                                        // 右箭头 - 切换到真数输入框
                                        if (this.isLogMode) {
                                            this.activeInput = 'number';
                                        }
                                    }
                                    else {
                                        this.inputNumber(keyItem.value);
                                    }
                                }
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (keyItem.flag === 0) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(keyItem.source !== undefined ? keyItem.source : '');
                                        Image.width(keyItem.width);
                                        Image.height(keyItem.height);
                                    }, Image);
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(keyItem.value);
                                        Text.fontSize((keyItem.value === CommonConstants.DOTS) ?
                                            ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 1.2 :
                                            (keyItem.value === 'log') ?
                                                ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 0.8 :
                                                (keyItem.value === '^') ?
                                                    ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 1.2 :
                                                    (keyItem.value === '←' || keyItem.value === '→') ?
                                                        ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint) * 1.1 :
                                                        ResponsiveAdapter.getButtonFontSize(this.currentBreakpoint));
                                        Text.fontColor((keyItem.value === '←' || keyItem.value === '→') ?
                                            this.getThemeColors().accentText : this.getThemeColors().primaryText);
                                        Text.fontWeight((keyItem.value === '←' || keyItem.value === '→') ?
                                            FontWeight.Bold : FontWeight.Normal);
                                    }, Text);
                                    Text.pop();
                                });
                            }
                        }, If);
                        If.pop();
                        Column.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, rowItem, forEachItemGenFunction, (keyItem: PressKeysBean) => JSON.stringify(keyItem), true, false);
                }, ForEach);
                ForEach.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, keysModel.getPressKeys(), forEachItemGenFunction, (item: Array<Array<PressKeysBean>>) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
        Column.pop();
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
                    }
                    else {
                        this.logNumber = this.logNumber.slice(0, -1);
                    }
                    break;
                case Symbol.EQU:
                    // 计算log结果
                    if (this.logBase && this.logNumber) {
                        let result = CalculateUtil.logarithm(this.logNumber, this.logBase);
                        if (isNaN(result)) {
                            this.inputValue = 'Error';
                        }
                        else {
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
                });
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
            }
            else {
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
        }
        else if (!secondLast) {
            this.expressions[len - 1] += value;
        }
        if (secondLast && CalculateUtil.isSymbol(secondLast)) {
            this.expressions[len - 1] += value;
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
        }
        else {
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
            this.calValue = this.resourceToString({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
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
        }
        catch (error) {
            Logger.error('[CalculateModel] getResourceString fail: ' + JSON.stringify(error));
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HomePage";
    }
}
registerNamedRoute(() => new HomePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/HomePage", pageFullPath: "entry/src/main/ets/pages/HomePage", integratedHsp: "false", moduleType: "followWithHap" });
