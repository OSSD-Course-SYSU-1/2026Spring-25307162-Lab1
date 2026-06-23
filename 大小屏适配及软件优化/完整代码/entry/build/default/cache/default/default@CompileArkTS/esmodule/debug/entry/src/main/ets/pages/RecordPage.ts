if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RecordPage_Params {
    records?: CalcRecord[];
    currentTheme?: ThemeType;
    themeManager?: ThemeManager;
}
import CalcRecordManager from "@bundle:com.example.simplecalculator/entry/ets/common/util/CalcRecordManager";
import type { CalcRecord } from "@bundle:com.example.simplecalculator/entry/ets/common/util/CalcRecordManager";
import router from "@ohos:router";
import { ThemeManager, ThemeType } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ThemeManager";
export class RecordPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__records = new ObservedPropertyObjectPU([], this, "records");
        this.__currentTheme = this.createStorageLink('currentTheme', ThemeType.LIGHT, "currentTheme");
        this.themeManager = ThemeManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RecordPage_Params) {
        if (params.records !== undefined) {
            this.records = params.records;
        }
        if (params.themeManager !== undefined) {
            this.themeManager = params.themeManager;
        }
    }
    updateStateVars(params: RecordPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__records.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTheme.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__records.aboutToBeDeleted();
        this.__currentTheme.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __records: ObservedPropertyObjectPU<CalcRecord[]>;
    get records() {
        return this.__records.get();
    }
    set records(newValue: CalcRecord[]) {
        this.__records.set(newValue);
    }
    private __currentTheme: ObservedPropertyAbstractPU<ThemeType>;
    get currentTheme() {
        return this.__currentTheme.get();
    }
    set currentTheme(newValue: ThemeType) {
        this.__currentTheme.set(newValue);
    }
    private themeManager: ThemeManager;
    // 获取当前主题颜色
    getThemeColors() {
        return this.currentTheme === ThemeType.LIGHT ? this.themeManager.getLightTheme() : this.themeManager.getDarkTheme();
    }
    aboutToAppear() {
        // 确保主题管理器已初始化
        ThemeManager.getInstance();
        this.records = CalcRecordManager.getInstance().getRecords();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(this.getThemeColors().secondaryBackground);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.height(56);
            // 标题栏
            Row.backgroundColor(this.getThemeColors().primaryBackground);
            // 标题栏
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(24);
            Text.fontColor(this.getThemeColors().accentText);
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('计算记录');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.getThemeColors().primaryText);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('    ');
            Text.fontSize(24);
        }, Text);
        Text.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 记录列表
            if (this.records.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.layoutWeight(1);
                        List.width('100%');
                        List.backgroundColor(this.getThemeColors().secondaryBackground);
                        List.divider({ strokeWidth: 1, color: this.getThemeColors().dividerColor });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
                                        Row.backgroundColor(this.getThemeColors().primaryBackground);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.alignItems(HorizontalAlign.Start);
                                        Column.layoutWeight(1);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.expression);
                                        Text.fontSize(16);
                                        Text.fontColor(this.getThemeColors().primaryText);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.result);
                                        Text.fontSize(20);
                                        Text.fontColor(this.getThemeColors().accentText);
                                        Text.fontWeight(FontWeight.Bold);
                                        Text.margin({ top: 4 });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.records, forEachItemGenFunction, (item: CalcRecord) => item.timestamp.toString(), true, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.layoutWeight(1);
                        Column.width('100%');
                        Column.backgroundColor(this.getThemeColors().secondaryBackground);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无计算记录');
                        Text.fontSize(16);
                        Text.fontColor(this.getThemeColors().secondaryText);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部按钮
            Row.create();
            // 底部按钮
            Row.width('100%');
            // 底部按钮
            Row.height(70);
            // 底部按钮
            Row.backgroundColor(this.getThemeColors().primaryBackground);
            // 底部按钮
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清空记录');
            Button.width('90%');
            Button.height(44);
            Button.fontSize(16);
            Button.fontColor(Color.White);
            Button.backgroundColor('#FF4444');
            Button.onClick(() => {
                CalcRecordManager.getInstance().clearRecords();
                this.records = [];
            });
        }, Button);
        Button.pop();
        // 底部按钮
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RecordPage";
    }
}
registerNamedRoute(() => new RecordPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/RecordPage", pageFullPath: "entry/src/main/ets/pages/RecordPage", integratedHsp: "false", moduleType: "followWithHap" });
