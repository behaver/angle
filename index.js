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
     * @return {[type]} [description]
     */
    this.time = function (a) {
        if (a === undefined) { // 获取时角值
            if (angle.time === undefined) { // 生成时角值
                angle.time = {};
                var _m = milliseconds
                angle.time.hours = parseInt(_m / 54000000);
                _m -= angle.time.hours * 54000000
                angle.time.minutes = parseInt(_m / 900000);
                _m -= angle.time.minutes * 900000;
                angle.time.seconds = _m / 15000;
                // angle.time.seconds = parseInt(_m / 15000);
                // _m -= angle.time.seconds * 15000;
                // angle.time.milliseconds = _m;
                return angle.time;
            } else {
                return angle.time;
            }
        } else { // 设置时角值
            angle = {time: {}};
            if (typeof(a) === 'object') {
                angle.time = {
                    hours: parseInt(a.hours),
                    minutes: parseInt(a.minutes),
                    seconds: parseFloat(a.seconds)
                    // milliseconds: parseInt(a.milliseconds)
                };
            } else {
                throw Error('Illagelity parameters.');
            }

            if (angle.time.minutes > 60 || angle.time.minutes < -60) throw Error('The range of minutes is -59 - 59.');
            if (angle.time.seconds > 60 || angle.time.seconds < -60) throw Error('The range of seconds is -59 - 59.');
            // if (angle.time.milliseconds > 1000 || angle.time.minutes < -1000) throw Error('The range of milliseconds is -999 - 999.');

            milliseconds = angle.time.hours * 54000000 + angle.time.minutes * 900000 + angle.time.seconds * 15000;
            return this;
        }
    }

    /**
     * 获取或设置日常标准角度值
     * 
     * @return {[type]} [description]
     */
    this.general = function (a) {
        if (a === undefined) { // 获取日常标准角度值
            if (angle.general === undefined) { // 生成标准值
                angle.general = {};
                var _m = milliseconds
                angle.general.degree = parseInt(_m / 3600000);
                _m -= angle.general.degree * 3600000
                angle.general.minutes = parseInt(_m / 60000);
                _m -= angle.general.minutes * 60000;
                angle.general.seconds = parseInt(_m / 1000);
                _m -= angle.general.seconds * 1000;
                angle.general.milliseconds = _m;
                return angle.general;
            } else {
                return angle.general;
            }
        } else { // 设置日常标准角度值
            angle = {general: {}};
            if (typeof(a) === 'object') {
                angle.general = {
                    degree: a.degree === undefined ? 0 : parseInt(a.degree),
                    minutes: a.minutes === undefined ? 0 : parseInt(a.minutes),
                    seconds: a.seconds === undefined ? 0 : parseInt(a.seconds),
                    milliseconds: a.milliseconds === undefined ? 0 : parseInt(a.milliseconds)
                };
            } else {
                throw Error('Illagelity parameters.');
            }

            if (angle.general.minutes > 60 || angle.general.minutes < -60) throw Error('The range of minutes is -59 - 59.');
            if (angle.general.seconds > 60 || angle.general.seconds < -60) throw Error('The range of seconds is -59 - 59.');
            if (angle.general.milliseconds > 1000 || angle.general.minutes < -1000) throw Error('The range of milliseconds is -999 - 999.');

            milliseconds = angle.general.degree * 3600000 + angle.general.minutes * 60000 + angle.general.seconds * 1000 + angle.general.milliseconds;
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