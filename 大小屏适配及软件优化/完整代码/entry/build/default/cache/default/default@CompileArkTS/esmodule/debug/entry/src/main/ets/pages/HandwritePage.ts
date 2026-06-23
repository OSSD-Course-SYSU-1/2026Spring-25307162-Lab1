if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HandwritePage_Params {
    inputValue?: string;
    resultValue?: string;
}
export class HandwritePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__inputValue = new ObservedPropertySimplePU('', this, "inputValue");
        this.__resultValue = new ObservedPropertySimplePU('', this, "resultValue");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HandwritePage_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.resultValue !== undefined) {
            this.resultValue = params.resultValue;
        }
    }
    updateStateVars(params: HandwritePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__resultValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__resultValue.aboutToBeDeleted();
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
    private __resultValue: ObservedPropertySimplePU<string>;
    get resultValue() {
        return this.__resultValue.get();
    }
    set resultValue(newValue: string) {
        this.__resultValue.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 显示区域
            Column.create();
            // 显示区域
            Column.width('100%');
            // 显示区域
            Column.height(100);
            // 显示区域
            Column.backgroundColor('#F5F5F5');
            // 显示区域
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.inputValue);
            Text.width('100%');
            Text.height(80);
            Text.fontSize(32);
            Text.fontColor(Color.Black);
            Text.textAlign(TextAlign.End);
            Text.padding({ right: 20 });
        }, Text);
        Text.pop();
        // 显示区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 手写区域提示
            Column.create();
            // 手写区域提示
            Column.layoutWeight(1);
            // 手写区域提示
            Column.width('100%');
            // 手写区域提示
            Column.backgroundColor('#FFFFFF');
            // 手写区域提示
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('手写输入区域');
            Text.fontSize(20);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('（功能开发中）');
            Text.fontSize(16);
            Text.fontColor('#CCCCCC');
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        // 手写区域提示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 结果显示
            Column.create();
            // 结果显示
            Column.width('100%');
            // 结果显示
            Column.height(60);
            // 结果显示
            Column.backgroundColor('#F0F0F0');
            // 结果显示
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('结果: ' + this.resultValue);
            Text.fontSize(24);
            Text.fontColor('#007DFF');
        }, Text);
        Text.pop();
        // 结果显示
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
