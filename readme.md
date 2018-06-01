# Angle JS模块

[![GitHub license](https://img.shields.io/badge/license-ISC-green.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/angle) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

顾名思义，Angle是一个用于处理 **角度单位** 的JS模块，创造它目的是为了 *更方便的处理和转换角度数值*。使用它，可以将任意角度单位数值进行 *转换* 。例如：将一个以 *度* 为单位数值转换为以 *弧度*。类似于JS中Date对象对时间处理，Angle也可以将你的角度数值作为一个字符串输出，例如：30°24‘32’‘。

## 用例

基本的单位转换操作

```js
var Angle = require('@behaver/angle');
var a = new Angle();
a.radian(Math.PI);
console.log(a.degree());
```

本例示范将**弧度值**转化为**角度值**，将会输出数值 *180*


## API文档

