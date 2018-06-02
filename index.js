'use strict';

/**
 * Angle 对象
 * 
 * Angle 对象用于处理各种角度单位数值
 * 
 * @author 董三碗 <qianxing@yeah.net>
 * @version 1.1.0
 */
export default function (num, unit) {

    // 各角度数值缓存对象
    var angle = {};

    // 角度对应毫秒值
    var milliseconds = 0;

    const scalesMap = {
        ms: 1,
        s: 1000,
        m: 60000,
        d: 3600000,
        r: 648000000 * Math.PI,
        th: 54000000,
        tm: 900000,
        ts: 15000,
        tms: 15,
    }

    // 初始值设定
    if (typeof num === 'number') _cp(unit, num);
    else if (typeof num === 'object') {
        if (unit == 'dac') this.DAComplex(num);
        if (unit == 'hac') this.HAComplex(num);
    }

    /**
     * 设置/获取 公共过程
     * 
     * @param  {[type]} unit [description]
     * @param  {[type]} num  [description]
     * @return {[type]}      [description]
     */
    var _cp = function (unit, num) {
        if (unit && unit in scalesMap) {
            if (num === undefined) {
                if (angle[unit] === undefined) {
                    return angle[unit] = milliseconds / scalesMap[unit];
                } else {
                    return angle[unit];
                }
            } else { // 设置角秒值
                angle = {};
                angle[unit] = num;
                milliseconds = num * scalesMap[unit];
                return this;
            };
        } else throw Error('Unknow angle unit.');
    }

    /**
     * 获取或设置毫秒值
     * 
     * @param  {[type]} num [description]
     * @return {[type]}    [description]
     */
    this.milliseconds = function (num) {
        if (num === undefined) { // 获取毫秒值
            return milliseconds;
        } else { // 设置毫秒值
            angle = {};
            milliseconds = num;
            return this;
        }
    }

    /**
     * 获取或设置角秒值
     * 
     * @param  {[type]} num [description]
     * @return {[type]}      [description]
     */
    this.seconds = function (num) {
        return _cp('s', num);
    }

    /**
     * 获取或设置角分值
     * 
     * @param  {[type]} num [description]
     * @return {[type]}   [description]
     */
    this.minutes = function (num) {
        return _cp('m', num);
    }

    /**
     * 获取或设置角度值
     * 
     * @param  {[type]} num [description]
     * @return {[type]}        [description]
     */
    this.degree = function (num) {
        return _cp('d', num);
    }

    /**
     * 获取或设置弧度值
     * 
     * @param  {[type]} num [description]
     * @return {[type]}        [description]
     */
    this.radian = function (num) {
        return _cp('r', num);
    }

    /**
     * 获取或设置时角时
     * 
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    this.tHours = function (num) {
        return _cp('th', num);
    }

    /**
     * 获取或设置时角分
     * 
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    this.tMinutes = function (num) {
        return _cp('tm', num);
    }

    /**
     * 获取或设置时角秒
     * 
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    this.tSeconds = function (num) {
        return _cp('ts', num);
    }

    /**
     * 获取或设置时角毫秒
     * 
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    this.tMilliseconds = function (num) {
        return _cp('tms', num);
    }

    /**
     * 获取或设置时角值
     *
     * @param  {[type]} hac [description]
     * @return {[type]} [description]
     */
    this.HAComplex = function (hac) {
        if (hac === undefined) { // 获取时角对象
            if (angle.hac === undefined) { // 生成时角值
                angle.hac = {};
                var _m = milliseconds;
                angle.hac.hours = parseInt(_m / 54000000);
                _m = angle.hac.hours % 54000000
                angle.hac.minutes = parseInt(_m / 900000);
                _m = angle.hac.minutes % 900000;
                angle.hac.seconds = parseInt(_m / 15000);
                _m = angle.hac.seconds % 15000;
                angle.hac.milliseconds = _m / 15;
                return angle.hac;
            } else return angle.hac;
        } else { // 设置时角对象
            if (typeof(hac) === 'object') {
                if (hac.minutes > 59 || hac.minutes < -59) throw Error('The range of tMinutes must be -59 ~ 59.');
                if (hac.seconds > 59 || hac.seconds < -59) throw Error('The range of tSeconds must be -59 ~ 59.');
                if (hac.milliseconds > 999 || hac.milliseconds < -999) throw Error('The range of tMilliseconds must be -999 ~ 999.');
                
                angle = {
                    hac: {
                        hours: hac.hours == undefined ? 0 : parseInt(hac.hours),
                        minutes: hac.minutes == undefined ? 0 : parseInt(hac.minutes),
                        seconds: hac.seconds == undefined ? 0 : parseFloat(hac.seconds),
                        milliseconds: hac.milliseconds == undefined ? 0 : parseInt(hac.milliseconds),
                    }
                };

                milliseconds = angle.hac.hours * 54000000 + angle.hac.minutes * 900000 + angle.hac.seconds * 15000 + angle.hac.milliseconds * 15;
            } else throw Error('Illagelity parameters.');

            return this;
        }
    }

    /**
     * 获取或设置日常标准角度值
     * 
     * @return {[type]} [description]
     */
    this.DAComplex = function (dac) {
        if (dac === undefined) { // 获取日常标准角度值
            if (angle.dac === undefined) { // 生成标准值
                angle.dac = {};
                var _m = milliseconds
                angle.dac.degree = parseInt(_m / 3600000);
                _m = angle.dac.degree % 3600000
                angle.dac.minutes = parseInt(_m / 60000);
                _m = angle.dac.minutes % 60000;
                angle.dac.seconds = parseInt(_m / 1000);
                _m = angle.dac.seconds % 1000;
                angle.dac.milliseconds = _m;
                return angle.dac;
            } else {
                return angle.dac;
            }
        } else { // 设置日常标准角度值
            if (typeof(dac) === 'object') {
                if (dac.minutes > 59 || dac.minutes < -59) throw Error('The range of minutes is -59 - 59.');
                if (dac.seconds > 59 || dac.seconds < -59) throw Error('The range of seconds is -59 - 59.');
                if (dac.milliseconds > 999 || dac.milliseconds < -999) throw Error('The range of milliseconds is -999 - 999.');
                
                angle = { 
                    dac: {
                        degree: dac.degree == undefined ? 0 : parseInt(dac.degree),
                        minutes: dac.minutes == undefined ? 0 : parseInt(dac.minutes),
                        seconds: dac.seconds == undefined ? 0 : parseInt(dac.seconds),
                        milliseconds: dac.milliseconds == undefined ? 0 : parseInt(dac.milliseconds)
                    }
                };

                milliseconds = angle.dac.degree * 3600000 + angle.dac.minutes * 60000 + angle.dac.seconds * 1000 + angle.dac.milliseconds;
            } else {
                throw Error('Illagelity parameters.');
            }

            return this;
        }
    }

    this.generalStr = function (a) {
        if (a === undefined) { // 获取日常标准角度值
            var general = this.general();
            return general.degree + '°' + general.minutes + '′' + general.seconds + '"' + general.milliseconds;
        } else { // 设置日常标准角度值
            angle = { general: {} };
            if (r = a.match(/^([-+]?\d+)[^\d-+]+(?:(\d+)[^\d-+]+(?:([-+]?\d+)(?:.(\d+))?[^\d-+]*)?)?/)) {
                r[4]  = r[4] ? '0.' + r[4] : '0';
                angle.general = {
                    degree: parseInt(r[1]),
                    minutes: parseInt(r[2]),
                    seconds: r[3] ? parseInt(r[3]) : 0,
                    milliseconds: parseFloat(r[4]) * 1000
                };

                if (angle.general.degree < 0) {
                    angle.general.minutes = -angle.general.minutes;
                    angle.general.seconds = -angle.general.seconds;
                    angle.general.milliseconds = -angle.general.milliseconds;
                };
            } else {
                throw Error('Illagelity parameters.');
            }
        }
    }

    /**
     * 将角度转换为一周之内
     * 
     * @return {[type]} [description]
     */
    this.inRound = function () {
        milliseconds %= 1296000000;
        if (milliseconds < 0) milliseconds += 1296000000;
        angle = {};
        return this;
    }

    /**
     * 将角度转化为 -180 到 180 之间
     * 
     * @return {[type]} [description]
     */
    this.inHalf = function () {
        this.inRound();
        if (milliseconds > 648000000) milliseconds -= 1296000000;
        return this;
    }

    this.inRange = function (min, max) {
        if (max - min == 360) {

        } else throw Error('Illagelity parameters.');
        return this;
    }

    this.setAngleCache = function (angleCache) {
        angle = angleCache;
        return this;
    }

    this.clone = function () {
        var newCache = {};
        for (var key in angle) newCache[key] = angle[key];
        return (new Angle).milliseconds(milliseconds).setAngleCache(newCache);
    }
};