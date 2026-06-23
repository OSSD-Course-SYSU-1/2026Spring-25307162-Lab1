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
 * 点数据结构
 */
export interface GraphPoint {
  x: number;
  y: number;
}

/**
 * 函数处理结果
 */
interface ProcessResult {
  expr: string;
  changed: boolean;
}

/**
 * 函数解析器
 * 支持解析和计算初等函数
 */
export class FunctionParser {
  private static pos: number = 0;
  private static expr: string = '';

  /**
   * 计算函数值
   * @param expression 函数表达式，如 "x^2", "sin(x)", "2*x+1"
   * @param x 自变量值
   * @returns 函数值，如果出错返回 NaN
   */
  static evaluate(expression: string, x: number): number {
    try {
      // 特殊处理 sin(x)/x 在 x=0 的情况
      if (expression.toLowerCase().replace(/\s+/g, '') === 'sin(x)/x') {
        if (Math.abs(x) < 0.0001) {
          return 1; // lim(x->0) sin(x)/x = 1
        }
      }
      
      // 预处理表达式
      let expr = FunctionParser.preprocess(expression);
      // 替换 x 为实际值
      expr = FunctionParser.replaceX(expr, x);
      // 计算结果
      return FunctionParser.calculate(expr);
    } catch (e) {
      return NaN;
    }
  }

  /**
   * 预处理表达式
   */
  private static preprocess(expression: string): string {
    let expr = expression.toLowerCase().replace(/\s+/g, '');
    
    // 处理幂运算符 ^
    expr = expr.replace(/\^/g, '**');
    
    // 处理隐式乘法，如 2x -> 2*x, xsin(x) -> x*sin(x)
    // 注意：不要在函数名和左括号之间插入乘号
    expr = expr.replace(/(\d)([a-z])/g, '$1*$2');
    expr = expr.replace(/([a-z])(\d)/g, '$1*$2');
    expr = expr.replace(/\)(\d)/g, ')*$1');
    expr = expr.replace(/(\d)\(/g, '$1*(');
    expr = expr.replace(/\)([a-z])/g, ')*$1');
    // 移除了这行，避免在函数名和左括号之间插入乘号
    // expr = expr.replace(/([a-z])\(/g, '$1*(');
    
    return expr;
  }

  /**
   * 替换 x 为实际值
   */
  private static replaceX(expression: string, x: number): string {
    // 使用正则表达式替换 x（但不是其他单词的一部分）
    // 对于负数，需要加括号以避免幂运算优先级问题
    const xStr = x < 0 ? `(${x})` : String(x);
    let expr = expression.replace(/(?<![a-z])x(?![a-z])/g, xStr);
    return expr;
  }

  /**
   * 计算表达式
   */
  private static calculate(expression: string): number {
    let expr = expression;
    
    // 处理三角函数
    expr = FunctionParser.processTrigonometric(expr);
    
    // 处理指数和对数函数
    expr = FunctionParser.processExponential(expr);
    
    // 处理其他数学函数
    expr = FunctionParser.processMathFunctions(expr);
    
    // 使用递归下降解析器计算
    try {
      return FunctionParser.parseExpression(expr);
    } catch (e) {
      return NaN;
    }
  }

  /**
   * 处理三角函数
   */
  private static processTrigonometric(expression: string): string {
    let expr = expression;
    
    // 处理嵌套的三角函数（从内到外）
    const trigFunctions: string[] = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
    
    for (let i = 0; i < 10; i++) { // 最多处理10层嵌套
      let changed = false;
      for (let j = 0; j < trigFunctions.length; j++) {
        const func = trigFunctions[j];
        // 修改正则表达式以支持一层嵌套括号
        const regex = new RegExp(`${func}\\(([^()]+|\\([^()]+\\))\\)`, 'g');
        const newExpr = expr.replace(regex, (match: string, inner: string): string => {
          changed = true;
          const value = FunctionParser.parseExpression(inner);
          let result: number;
          switch (func) {
            case 'sin':
              result = Math.sin(value);
              break;
            case 'cos':
              result = Math.cos(value);
              break;
            case 'tan':
              result = Math.tan(value);
              break;
            case 'asin':
              result = Math.asin(value);
              break;
            case 'acos':
              result = Math.acos(value);
              break;
            case 'atan':
              result = Math.atan(value);
              break;
            default:
              result = NaN;
              break;
          }
          return String(result);
        });
        expr = newExpr;
      }
      if (!changed) break;
    }
    
    return expr;
  }

  /**
   * 处理指数和对数函数
   */
  private static processExponential(expression: string): string {
    let expr = expression;
    
    for (let i = 0; i < 10; i++) {
      let changed = false;
      
      // exp(x)
      const expResult = FunctionParser.processFunction(expr, 'exp', (v: number) => Math.exp(v));
      if (expResult.changed) {
        expr = expResult.expr;
        changed = true;
      }
      
      // ln(x) - 自然对数
      const lnResult = FunctionParser.processFunction(expr, 'ln', (v: number) => Math.log(v));
      if (lnResult.changed) {
        expr = lnResult.expr;
        changed = true;
      }
      
      // log(x) - 以10为底的对数
      const logResult = FunctionParser.processFunction(expr, 'log', (v: number) => Math.log10(v));
      if (logResult.changed) {
        expr = logResult.expr;
        changed = true;
      }
      
      // sqrt(x) - 平方根
      const sqrtResult = FunctionParser.processFunction(expr, 'sqrt', (v: number) => Math.sqrt(v));
      if (sqrtResult.changed) {
        expr = sqrtResult.expr;
        changed = true;
      }
      
      // abs(x) - 绝对值
      const absResult = FunctionParser.processFunction(expr, 'abs', (v: number) => Math.abs(v));
      if (absResult.changed) {
        expr = absResult.expr;
        changed = true;
      }
      
      if (!changed) break;
    }
    
    return expr;
  }

  /**
   * 处理单个函数
   */
  private static processFunction(expression: string, funcName: string, 
    func: (v: number) => number): ProcessResult {
    // 修改正则表达式以支持一层嵌套括号
    const regex = new RegExp(`${funcName}\\(([^()]+|\\([^()]+\\))\\)`, 'g');
    let changed = false;
    const expr = expression.replace(regex, (match: string, inner: string): string => {
      changed = true;
      const value = FunctionParser.parseExpression(inner);
      return String(func(value));
    });
    const result: ProcessResult = { expr: expr, changed: changed };
    return result;
  }

  /**
   * 处理其他数学函数
   */
  private static processMathFunctions(expression: string): string {
    let expr = expression;
    
    // 替换 e 为欧拉数
    expr = expr.replace(/(?<![a-z])e(?![a-z])/g, String(Math.E));
    
    // 替换 pi 为圆周率
    expr = expr.replace(/pi/g, String(Math.PI));
    
    return expr;
  }

  /**
   * 简单的递归下降表达式解析器
   */
  private static parseExpression(expression: string): number {
    FunctionParser.expr = expression.replace(/\s+/g, '');
    FunctionParser.pos = 0;
    return FunctionParser.parseAddSub();
  }

  private static parseNumber(): number {
    let num = '';
    while (FunctionParser.pos < FunctionParser.expr.length && 
           (FunctionParser.expr[FunctionParser.pos].match(/[\d.e]/) || 
            (FunctionParser.expr[FunctionParser.pos] === '-' && num === '') ||
            (FunctionParser.expr[FunctionParser.pos] === '+' && num === ''))) {
      num += FunctionParser.expr[FunctionParser.pos++];
    }
    return parseFloat(num);
  }

  private static parseFactor(): number {
    if (FunctionParser.pos < FunctionParser.expr.length && 
        FunctionParser.expr[FunctionParser.pos] === '(') {
      FunctionParser.pos++; // skip '('
      const result = FunctionParser.parseTerm();
      if (FunctionParser.pos < FunctionParser.expr.length && 
          FunctionParser.expr[FunctionParser.pos] === ')') {
        FunctionParser.pos++; // skip ')'
      }
      return result;
    }
    return FunctionParser.parseNumber();
  }

  private static parsePower(): number {
    let left = FunctionParser.parseFactor();
    while (FunctionParser.pos < FunctionParser.expr.length && 
           FunctionParser.expr[FunctionParser.pos] === '*') {
      FunctionParser.pos++;
      if (FunctionParser.pos < FunctionParser.expr.length && 
          FunctionParser.expr[FunctionParser.pos] === '*') {
        FunctionParser.pos++;
        const right = FunctionParser.parseFactor();
        left = Math.pow(left, right);
      } else {
        // 这是乘法，回退
        FunctionParser.pos--;
        break;
      }
    }
    return left;
  }

  private static parseTerm(): number {
    let left = FunctionParser.parsePower();
    while (FunctionParser.pos < FunctionParser.expr.length) {
      const op = FunctionParser.expr[FunctionParser.pos];
      if (op === '*') {
        FunctionParser.pos++;
        left *= FunctionParser.parsePower();
      } else if (op === '/') {
        FunctionParser.pos++;
        const right = FunctionParser.parsePower();
        if (right === 0) return NaN;
        left /= right;
      } else {
        break;
      }
    }
    return left;
  }

  private static parseAddSub(): number {
    let left = FunctionParser.parseTerm();
    while (FunctionParser.pos < FunctionParser.expr.length) {
      const op = FunctionParser.expr[FunctionParser.pos];
      if (op === '+') {
        FunctionParser.pos++;
        left += FunctionParser.parseTerm();
      } else if (op === '-') {
        FunctionParser.pos++;
        left -= FunctionParser.parseTerm();
      } else {
        break;
      }
    }
    return left;
  }

  /**
   * 生成函数图像数据点
   * @param expression 函数表达式
   * @param xMin x轴最小值
   * @param xMax x轴最大值
   * @param points 采样点数
   * @returns 点数组 [{x, y}]
   */
  static generatePoints(expression: string, xMin: number, xMax: number, 
    points: number = 200): GraphPoint[] {
    const result: GraphPoint[] = [];
    const step = (xMax - xMin) / points;
    
    for (let i = 0; i <= points; i++) {
      const x = xMin + i * step;
      const y = FunctionParser.evaluate(expression, x);
      result.push({ x: x, y: y });
    }
    
    return result;
  }

  /**
   * 验证函数表达式是否有效
   */
  static validate(expression: string): boolean {
    if (!expression || expression.trim() === '') {
      return false;
    }
    
    // 尝试在几个点计算
    const testPoints: number[] = [-1, 0, 1, 2];
    for (let i = 0; i < testPoints.length; i++) {
      const x = testPoints[i];
      const y = FunctionParser.evaluate(expression, x);
      if (!isNaN(y) && isFinite(y)) {
        return true;
      }
    }
    
    return false;
  }
}
