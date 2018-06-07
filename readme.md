# Angle nodejs模块

[![GitHub license](https://img.shields.io/badge/license-ISC-green.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/angle) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

顾名思义，Angle是一个用于处理 **角度单位** 的JS模块，创造它目的是为了 *更方便的处理角度数值*。它可以将任意角度单位数值进行 *转换* 。例如：将一个以 *度* 为单位数值转换为以 *弧度*。类似于JS中Date对象对时间处理，Angle也可以将你的角度数值作为一个字符串输出，例如：30°24‘32’‘。

## 功能

1. 各 *角度单位* 下数值的转化获取
2. 生成 *角度值* 标准化字符串

## 用例

通过 npm 安装，在你的 node 项目目录下执行：

`npm install @behaver/angle`

-----

角度单位间数值的转换：

```js
var Angle = require('@behaver/angle');
var a = new Angle();
a.radians(Math.PI);
console.log(a.degrees());
```

本例将 **弧度值** 转化为 **角度值** ，将会输出数值： *180*

-----

更简洁地，你可以通过 Angle 构造函数参数初始化对象：

```js
var Angle = require('@behaver/angle');
var a = new Angle(15, 'th');
console.log(a.degrees());
```

本例初始化了一个 *时角* 为 *15* 的角度对象，最后输出： *225*

Angle 构造函数的第二个参数为 *角度单位* ，可用参数包含：

* `d` 角度
* `m` 角分
* `s` 角秒
* `ms` 角毫秒
* `r` 弧度
* `th` 时角时
* `tm` 时角分
* `ts` 时角秒
* `tms` 时角毫秒
* `hac` 复合时角对象
* `dac` 复合度角对象
* `hacs` 复合时角字符串
* `dacs` 复合度角字符串

-----

使用 *复合角度对象* 并输出 *复合字符串* ：

```js
var Angle = require('@behaver/angle');
var a = new Angle();
a.DAComplex(130, 20, 30, 865);
console.log(a.HACString());
a.HAComplex({
	h: 3,
	m: 24,
	s: 30,
	ms: 453,
});
console.log(a.toString());
```

本例先后给定了 130°20′20.865″ 和 3h24m30s453ms 两个角度值，最后分别输出：

`8h 41m 22s 57.67ms` 和 `51°7′36.795″`

---

使用 *复合字符串* 定义角度值：

```js
var Angle = require('@behaver/angle');
var a = new Angle('33°33′33.333″', 'dac');
// 或者你也可以使用下面这种方法定义
// a.DACString('33°33′33.333″');
console.log(a.DAComplex());

var b = new Angle;
b.HACString('12h 23m 34s 456ms');
console.log(b.HAComplex());
```

本例输出：

`{ d: 33, m: 33, s: 33, ms: 333 }` 和 `{ h: 12, m: 23, s: 34, ms: 456 }`

---

将 *角度值* 转换至给定的 *圆周范围* 内：

```js
var Angle = require('@behaver/angle');
var a = new Angle(361, 'd');
console.log(a.inRound().degrees());
console.log(a.inRound(360).degrees());
console.log(a.inRound(2 * Math.PI, 'r').degrees());
```

本例输出：`1` 、 `361` 和 `361`

## API

`degrees(num)`
以 **角度** 为单位，获取/设置 角度数值

`minutes(num)`
以 **角分** 为单位，获取/设置 角度数值

`seconds(num)`
以 **角秒** 为单位，获取/设置 角度数值

`milliseconds(num)`
以 **角毫秒** 为单位，获取/设置 角度数值

`radians(num)`
以 **弧度** 为单位，获取/设置 角度数值

`tHours(num)`
以 **时角时** 为单位，获取/设置 角度数值

`tMinutes(num)`
以 **时角分** 为单位，获取/设置 角度数值

`tSeconds(num)`
以 **时角秒** 为单位，获取/设置 角度数值

`tMilliseconds(num)`
以 **时角毫秒** 为单位，获取/设置 角度数值

`HAComplex(h, m, s, ms)`
以 **复合时角对象** 为单位，获取/设置 角度数值

`DAComplex(d, m, s, ms)`
以 **复合度角对象** 为单位，获取/设置 角度数值

`HACString(str)`
以 **复合时角字符串** 为单位，获取/设置 角度数值

`DACString(str)`
以 **复合度角字符串** 为单位，获取/设置 角度数值

`toString(unit)`
获取 **复合度角\时角** 字符串

`inRound(from, unit)`
转换角度至 *[from, from+360°)* 的数值范围，unit 参数用于指定 from 的单位，包含以下取值：

* `d` 角度
* `m` 角分
* `s` 角秒
* `ms` 角毫秒
* `r` 弧度
* `th` 时角时
* `tm` 时角分
* `ts` 时角秒
* `tms` 时角毫秒

其中 from 缺省值为 0，unit 的缺省值为 'd'

