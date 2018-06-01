# Angle JS模块

[![GitHub license](https://img.shields.io/badge/license-ISC-green.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/angle) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

顾名思义，Angle是一个用于处理 **角度单位** 的JS模块，创造它目的是为了 **更方便的处理角度数值**。使用它，可以将任意角度单位数值进行 *转换* 。例如：将一个以 *度* 为单位数值转换为以 *弧度*。类似于JS中Date对象对时间处理，Angle也可以将你的角度数值作为一个字符串输出，例如：30°24‘32’‘。

## 功能

1. 各 *角度单位* 下数值的转化获取
2. 生成 *角度值* 标准化字符串

## 用例

通过 npm 安装，在你的 node 项目目录下执行：

`npm install @behaver/angle`

角度单位间数值的转换：

```js
var Angle = require('@behaver/angle');
var a = new Angle();
a.radian(Math.PI);
console.log(a.degree());
```

本例将 **弧度值** 转化为 **角度值** ，将会输出数值 *180*

直接通过构造函数参数初始化角度对象：

```js
var Angle = require('@behaver/angle');
var a = new Angle(15, 'th');
console.log(a.degree());
```

本例初始化了一个时角为15的角度对象，最后输出 *225*

## API

`degree()`
以 **角度** 为单位，获取/设置 角度数值

`minutes()`
以 **角分** 为单位，获取/设置 角度数值

`seconds()`
以 **角秒** 为单位，获取/设置 角度数值

`milliseconds()`
以 **角毫秒** 为单位，获取/设置 角度数值

`radian()`
以 **弧度** 为单位，获取/设置 角度数值

`tHours()`
以 **时角时** 为单位，获取/设置 角度数值

`tMinutes()`
以 **时角分** 为单位，获取/设置 角度数值

`tSeconds()`
以 **时角秒** 为单位，获取/设置 角度数值

`tMilliseconds()`
以 **时角毫秒** 为单位，获取/设置 角度数值


