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
/**
 * 主题类型枚举
 */
export enum ThemeType {
    LIGHT = "light",
    DARK = "dark"
}
/**
 * 主题颜色配置接口
 */
export interface ThemeColors {
    // 背景色
    primaryBackground: string;
    secondaryBackground: string;
    inputBackground: string;
    buttonBackground: string;
    // 文本色
    primaryText: string;
    secondaryText: string;
    accentText: string;
    // 边框和分隔线
    borderColor: string;
    dividerColor: string;
    // 强调色
    accentColor: string;
    equalsButtonColor: string;
    // 导航栏
    navBackground: string;
    navActiveText: string;
    navInactiveText: string;
}
/**
 * 主题管理器
 * 使用AppStorage进行全局状态管理
 */
export class ThemeManager {
    private static instance: ThemeManager;
    private static readonly THEME_KEY = 'currentTheme';
    // 浅色主题配置
    private readonly lightTheme: ThemeColors = {
        primaryBackground: '#FFFFFF',
        secondaryBackground: '#F5F5F5',
        inputBackground: '#F5F5F5',
        buttonBackground: '#FFFFFF',
        primaryText: '#182431',
        secondaryText: '#666666',
        accentText: '#007DFF',
        borderColor: '#F5F5F5',
        dividerColor: '#E0E0E0',
        accentColor: '#007DFF',
        equalsButtonColor: '#007DFF',
        navBackground: '#FFFFFF',
        navActiveText: '#007DFF',
        navInactiveText: '#666666'
    };
    // 深色主题配置
    private readonly darkTheme: ThemeColors = {
        primaryBackground: '#000000',
        secondaryBackground: '#000000',
        inputBackground: '#000000',
        buttonBackground: '#000000',
        primaryText: '#FFFFFF',
        secondaryText: '#AAAAAA',
        accentText: '#4DA6FF',
        borderColor: '#333333',
        dividerColor: '#333333',
        accentColor: '#4DA6FF',
        equalsButtonColor: '#4DA6FF',
        navBackground: '#000000',
        navActiveText: '#4DA6FF',
        navInactiveText: '#AAAAAA'
    };
    private constructor() {
        // 初始化主题，默认为浅色
        if (!AppStorage.has(ThemeManager.THEME_KEY)) {
            AppStorage.set(ThemeManager.THEME_KEY, ThemeType.LIGHT);
        }
    }
    /**
     * 获取主题管理器单例
     */
    static getInstance(): ThemeManager {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }
    /**
     * 获取当前主题类型
     */
    getCurrentTheme(): ThemeType {
        return AppStorage.get(ThemeManager.THEME_KEY) || ThemeType.LIGHT;
    }
    /**
     * 切换主题
     */
    toggleTheme(): void {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
        AppStorage.set(ThemeManager.THEME_KEY, newTheme);
    }
    /**
     * 设置指定主题
     */
    setTheme(theme: ThemeType): void {
        AppStorage.set(ThemeManager.THEME_KEY, theme);
    }
    /**
     * 获取当前主题颜色配置
     */
    getThemeColors(): ThemeColors {
        const currentTheme = this.getCurrentTheme();
        return currentTheme === ThemeType.LIGHT ? this.lightTheme : this.darkTheme;
    }
    /**
     * 判断是否为深色主题
     */
    isDarkTheme(): boolean {
        return this.getCurrentTheme() === ThemeType.DARK;
    }
    /**
     * 获取浅色主题配置
     */
    getLightTheme(): ThemeColors {
        return this.lightTheme;
    }
    /**
     * 获取深色主题配置
     */
    getDarkTheme(): ThemeColors {
        return this.darkTheme;
    }
}
