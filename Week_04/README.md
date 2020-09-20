学习笔记
# 1（泛用）语言分类
# 1.1非形式语言
# 1.2形式语言（乔姆斯基谱系）
* 0型 无限制文法
* 1型 上下文相关文法
* 2型 上下文无关文法
* 3型 正则文法

前者包含后者，反之不成立，如满足1型，一定满足0型

# 2 产生式（BNF：巴科斯-诺尔范式）
## 2.1概念
* 语法结构名：用尖括号括起来的名称来表示
* 语法结构分成基础结构和(需要用其他语法结构定义的)复合结构
    * 基础结构称 终结符
    * 复合结构称 非终结符
* 符号说明：
    * 引号和中间的字符表示终结符
    * 可以有括号
    * *表示重复多次
    * |表示或
    * +表示至少一次

## 2.1例子
* 四则运算
    * 1+2*3
* 终结符：
    * Number
    * \+ - * /
* 非终结符：
    * MultiplicativeExpression
    * AddtiveExpression
```
<MultiplicativeExpression>::=<Number>|<MultiplicativeExpression>"*"<Number>|<MultiplicativeExpression>"/"<Number>

<AddtiveExpression>::=<MultiplicativeExpression>|<AddtiveExpression>"+"<MultiplicativeExpression>|<AddtiveExpression>"-"<MultiplicativeExpression>
```


