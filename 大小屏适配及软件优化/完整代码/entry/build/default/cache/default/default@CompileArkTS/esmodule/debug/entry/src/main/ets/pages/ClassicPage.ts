if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ClassicPage_Params {
    inputValue?: string;
    calValue?: string;
    isLogMode?: boolean;
    logBase?: string;
    logNumber?: string;
    activeInput?: string;
    showCursor?: boolean;
    cursorTimer?: number;
    expressions?: Array<string>;
}
import Logger from "@bundle:com.example.simplecalculator/entry/ets/common/util/Logger";
import CalculateUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CalculateUtil";
import CheckEmptyUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CheckEmptyUtil";
import keysModel from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PresskeysViewModel";
import type { PressKeysBean } from '../viewmodel/PressKeysItem';
import { CommonConstants, Symbol } from "@bundle:com.example.simplecalculator/entry/ets/common/constants/CommonConstants";
export class ClassicPage extends ViewPU {
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
        this.cursorTimer = -1;
        this.expressions = [];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ClassicPage_Params) {
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
    }
    updateStateVars(params: ClassicPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__calValue.purgeDependencyOnElmtId(rmElmtId);
        this.__isLogMode.purgeDependencyOnElmtId(rmElmtId);
        this.__logBase.purgeDependencyOnElmtId(rmElmtId);
        this.__logNumber.purgeDependencyOnElmtId(rmElmtId);
        this.__activeInput.purgeDependencyOnElmtId(rmElmtId);
        this.__showCursor.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__calValue.aboutToBeDeleted();
        this.__isLogMode.aboutToBeDeleted();
        this.__logBase.aboutToBeDeleted();
        this.__logNumber.aboutToBeDeleted();
        this.__activeInput.aboutToBeDeleted();
        this.__showCursor.aboutToBeDeleted();
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
    private __isLogMode: ObservedPropertySimplePU<boolean>;
    get isLogMode() {
        return this.__isLogMode.get();
    }
    set isLogMode(newValue: boolean) {
        this.__isLogMode.set(newValue);
    }
    private __logBase: ObservedPropertySimplePU<string>;
    get logBase() {
        return this.__logBase.get();
    }
    set logBase(newValue: string) {
        this.__logBase.set(newValue);
    }
    private __logNumber: ObservedPropertySimplePU<string>;
    get logNumber() {
        return this.__logNumber.get();
    }
    set logNumber(newValue: string) {
        this.__logNumber.set(newValue);
    }
    private __activeInput: ObservedPropertySimplePU<string>;
    get activeInput() {
        return this.__activeInput.get();
    }
    set activeInput(newValue: string) {
        this.__activeInput.set(newValue);
    }
    private __showCursor: ObservedPropertySimplePU<boolean>;
    get showCursor() {
        return this.__showCursor.get();
    }
    set showCursor(newValue: boolean) {
        this.__showCursor.set(newValue);
    }
    private cursorTimer: number;
    private expressions: Array<string>;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height(CommonConstants.FULL_PERCENT);
            Column.backgroundColor({ "id": 16777223, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLogMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(CommonConstants.FULL_PERCENT);
                        Column.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Column.margin({
                            right: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                            top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('log');
                        Text.fontSize(24);
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.margin({ right: 10 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('底数');
                        Text.fontSize(14);
                        Text.fontColor(Color.Gray);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.logBase + (this.activeInput === 'base' && this.showCursor ? '|' : '') });
                        TextInput.width(80);
                        TextInput.height(40);
                        TextInput.fontSize(18);
                        TextInput.textAlign(TextAlign.Center);
                        TextInput.borderColor(this.activeInput === 'base' ? Color.Blue : Color.Gray);
                        TextInput.borderWidth(2);
                        TextInput.backgroundColor(this.activeInput === 'base' ? '#E3F2FD' : Color.White);
                        TextInput.caretColor(Color.Blue);
                        TextInput.onClick(() => {
                            this.activeInput = 'base';
                        });
                        TextInput.onChange((value: string) => {
                            this.logBase = value.replace('|', '');
                        });
                    }, TextInput);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('(');
                        Text.fontSize(28);
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.margin({ left: 5, right: 5 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('真数');
                        Text.fontSize(14);
                        Text.fontColor(Color.Gray);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.logNumber + (this.activeInput === 'number' && this.showCursor ? '|' : '') });
                        TextInput.width(80);
                        TextInput.height(40);
                        TextInput.fontSize(18);
                        TextInput.textAlign(TextAlign.Center);
                        TextInput.borderColor(this.activeInput === 'number' ? Color.Blue : Color.Gray);
                        TextInput.borderWidth(2);
                        TextInput.backgroundColor(this.activeInput === 'number' ? '#E3F2FD' : Color.White);
                        TextInput.caretColor(Color.Blue);
                        TextInput.onClick(() => {
                            this.activeInput = 'number';
                        });
                        TextInput.onChange((value: string) => {
                            this.logNumber = value.replace('|', '');
                        });
                    }, TextInput);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(')');
                        Text.fontSize(28);
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
                        Column.create();
                        Column.width(CommonConstants.FULL_PERCENT);
                        Column.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.End);
                        Column.margin({
                            right: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                            top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.resultFormat(this.inputValue) });
                        TextInput.height(CommonConstants.FULL_PERCENT);
                        TextInput.fontSize((this.inputValue.length > CommonConstants.INPUT_LENGTH_MAX) ? { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : { "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        TextInput.enabled(false);
                        TextInput.fontColor(Color.Black);
                        TextInput.textAlign(TextAlign.End);
                        TextInput.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    }, TextInput);
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
            Text.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.width(CommonConstants.FULL_PERCENT);
            Column.backgroundColor({ "id": 16777226, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(CommonConstants.FULL_PERCENT);
            Row.alignItems(VerticalAlign.Top);
            Row.margin({
                left: { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                right: { "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, columnItemIndex?: number) => {
                const columnItem = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.layoutWeight(1);
                    Column.margin({
                        top: { "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                        bottom: { "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, keyItemIndex?: number) => {
                        const keyItem = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.layoutWeight(((columnItemIndex === (keysModel.getPressKeys().length - 1)) &&
                                (keyItemIndex === (columnItem.length - 1))) ? CommonConstants.TWO : 1);
                            Column.width(CommonConstants.FULL_PERCENT);
                            Column.justifyContent(FlexAlign.Center);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.height(((columnItemIndex === (keysModel.getPressKeys().length - 1)) &&
                                (keyItemIndex === (columnItem.length - 1))) ? { "id": 16777230, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.borderWidth(1);
                            Column.borderColor({ "id": 16777222, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777229, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.backgroundColor(((columnItemIndex === (keysModel.getPressKeys().length - 1)) &&
                                (keyItemIndex === (columnItem.length - 1))) ? { "id": 16777224, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : Color.White);
                            Column.alignItems(HorizontalAlign.Center);
                            Column.justifyContent(FlexAlign.Center);
                            Column.onClick(() => {
                                if (keyItem.flag === 0) {
                                    this.inputSymbol(keyItem.value);
                                }
                                else {
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
                                        if (this.isLogMode) {
                                            this.activeInput = 'base';
                                        }
                                    }
                                    else if (keyItem.value === '→') {
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
                                        Text.fontSize((keyItem.value === CommonConstants.DOTS) ? { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } :
                                            (keyItem.value === 'log') ?
                                                16 :
                                                (keyItem.value === '^') ?
                                                    24 :
                                                    (keyItem.value === '←' || keyItem.value === '→') ?
                                                        22 : { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                        Text.fontColor((keyItem.value === '←' || keyItem.value === '→') ?
                                            Color.Blue : Color.Black);
                                        Text.fontWeight((keyItem.value === '←' || keyItem.value === '→') ?
                                            FontWeight.Bold : FontWeight.Normal);
                                        Text.width(keyItem.width);
                                        Text.height(keyItem.height);
                                        Text.textAlign(TextAlign.Center);
                                    }, Text);
                                    Text.pop();
                                });
                            }
                        }, If);
                        If.pop();
                        Column.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, columnItem, forEachItemGenFunction, (keyItem: PressKeysBean) => JSON.stringify(keyItem), true, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, keysModel.getPressKeys(), forEachItemGenFunction, (item: Array<Array<PressKeysBean>>) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.startCursorBlink();
    }
    aboutToDisappear() {
        if (this.cursorTimer !== -1) {
            clearInterval(this.cursorTimer);
            this.cursorTimer = -1;
        }
    }
    private startCursorBlink() {
        if (this.cursorTimer !== -1) {
            clearInterval(this.cursorTimer);
        }
        this.cursorTimer = setInterval(() => {
            this.showCursor = !this.showCursor;
        }, 500);
    }
    inputSymbol(value: string) {
        if (CheckEmptyUtil.isEmpty(value)) {
            return;
        }
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
    inputNumber(value: string) {
        if (CheckEmptyUtil.isEmpty(value)) {
            return;
        }
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
    deepCopy(): Array<string> {
        let copyExpressions: Array<string> = Array.from(this.expressions);
        return copyExpressions;
    }
    async getResult() {
        let calResult = CalculateUtil.parseExpression(this.deepCopy());
        if (calResult === 'NaN') {
            this.calValue = this.resourceToString({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            return false;
        }
        this.calValue = calResult;
        return true;
    }
    resultFormat(value: string) {
        let reg = (value.indexOf('.') > -1) ? new RegExp("/(\d)(?=(\d{3})+\.)/g") : new RegExp("/(\d)(?=(?:\d{3})+$)/g");
        return value.replace(reg, '$1,');
    }
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
}
