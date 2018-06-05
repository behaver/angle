'use strict';

/**
 * Angle 对象
 * 
 * Angle 对象用于处理各种角度单位数值
 * 
 * @author 董三碗 <qianxing@yeah.net>
 * @version 1.1.0
 */
module.exports = function (num, unit) {

    var self = this;

    // 各角度数值缓存对象
    var angle = {};

    // 角度对应毫秒值
    var milliseconds = 0;

    const scalesMap = {
        ms: 1,
        s: 1000,
        m: 60000,
        d: 3600000,
        r: 648000000 / Math.PI,
        th: 54000000,
        tm: 900000,
        ts: 15000,
        tms: 15,
    }

    /**
     * 设置/获取 公共过程
     * 
     * @param  {[type]} unit [description]
     * @param  {[type]} num  [description]
     * @return {[type]}      [description]
     */
    function _cp(unit, num) {
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
                return self;
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
    this.degrees = function (num) {
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
    this.HAComplex = function (h, m, s, ms) {
        if (h === undefined) { // 获取
            if (angle.hac === undefined) { // 生成
                angle.hac = {};
                var _m = milliseconds;
                angle.hac.h = Math.floor(_m / scalesMap['th']);
                _m -= angle.hac.h * scalesMap['th'];
                angle.hac.m = Math.floor(_m / scalesMap['tm']);
                _m -= angle.hac.m * scalesMap['tm'];
                angle.hac.s = Math.floor(_m / scalesMap['ts']);
                _m -= angle.hac.s * scalesMap['ts'];
                angle.hac.ms = _m / scalesMap['tms'];
                return angle.hac;
            } else return angle.hac;
        } else { // 设置
            if (typeof(h) === 'object') {
                var _h = h.h == undefined ? 0 : Math.floor(h.h);
                var _m = h.m == undefined ? 0 : Math.floor(h.m);
                var _s = h.s == undefined ? 0 : Math.floor(h.s);

                // 考虑 s 为小数的情况
                var _sms = h.s % 1 * 1000;
                if (_sms && h.ms == undefined) var _ms = _sms;
                else var _ms = h.ms == undefined ? 0 : parseFloat(h.ms);
            } else if (typeof(h) === 'number' || typeof(h) === 'string') {
                var _h = h == undefined ? 0 : Math.floor(h);
                var _m = m == undefined ? 0 : Math.floor(m);
                var _s = s == undefined ? 0 : Math.floor(s);

                // 考虑 s 为小数的情况
                var _sms = s % 1 * 1000;
                if (_sms && ms == undefined) var _ms = _sms;
                else var _ms = ms == undefined ? 0 : parseFloat(ms);
            } else throw Error('Illagelity parameters.');

            if (_m >= 60 || _m <= -60) throw Error('The range of tMinutes must be (-60, 60).');
            if (_s >= 60 || _s <= -60) throw Error('The range of tSeconds must be (-60, 60).');
            if (_ms >= 1000 || _ms <= -1000) throw Error('The range of tMilliseconds must be (-1000, 1000).');
            
            angle = {
                hac: { h: _h, m: _m, s: _s, ms: _ms }
            };

            milliseconds = angle.hac.h * scalesMap['th'] + angle.hac.m * scalesMap['tm'] + angle.hac.s * scalesMap['ts'] + angle.hac.ms * scalesMap['tms'];

            return this;
        }
    }

    /**
     * 获取或设置日常标准角度值
     * 
     * @return {[type]} [description]
     */
    this.DAComplex = function (d, m, s, ms) {
        if (d === undefined) { // 获取
            if (angle.dac === undefined) { // 生成
                angle.dac = {};
                var _m = milliseconds;
                angle.dac.d = Math.floor(_m / scalesMap['d']);
                _m -= angle.dac.d * scalesMap['d'];
                angle.dac.m = Math.floor(_m / scalesMap['m']);
                _m -= angle.dac.m * scalesMap['m'];
                angle.dac.s = Math.floor(_m / scalesMap['s']);
                _m -= angle.dac.s * scalesMap['s'];
                angle.dac.ms = _m;
                return angle.dac;
            } else {
                return angle.dac;
            }
        } else { // 设置
            if (typeof(d) === 'object') {
                var _d = d.d == undefined ? 0 : Math.floor(d.d);
                var _m = d.m == undefined ? 0 : Math.floor(d.m);
                var _s = d.s == undefined ? 0 : Math.floor(d.s);

                // 考虑 s 为小数的情况
                var _sms = d.s % 1 * 1000;
                if (_sms && d.ms == undefined) var _ms = _sms;
                else var _ms = d.ms == undefined ? 0 : parseFloat(d.ms);
            } else if (typeof(d) === 'number' || typeof(d) === 'string') {
                var _d = d == undefined ? 0 : Math.floor(d);
                var _m = m == undefined ? 0 : Math.floor(m);
                var _s = s == undefined ? 0 : Math.floor(s);

                // 考虑 s 为小数的情况
                var _sms = s % 1 * 1000;
                if (_sms && ms == undefined) var _ms = _sms;
                else var _ms = ms == undefined ? 0 : parseFloat(ms);
            } else throw Error('Illagelity parameters.');

            if (_m >= 60 || _m <= -60) throw Error('The range of tMinutes must be (-60, 60).');
            if (_s >= 60 || _s <= -60) throw Error('The range of tSeconds must be (-60, 60).');
            if (_ms >= 1000 || _ms <= -1000) throw Error('The range of tMilliseconds must be (-1000, 1000).');
            
            angle = {
                dac: { d: _d, m: _m, s: _s, ms: _ms }
            };

            milliseconds = angle.dac.d * scalesMap['d'] + angle.dac.m * scalesMap['m'] + angle.dac.s * scalesMap['s'] + angle.dac.ms * scalesMap['ms'];

            return this;
        }
    }

    this.DACString = function(str) {
        if (str === undefined) { // 获取
            var dac = this.DAComplex();
            return dac.d + '°' + dac.m + '′' + (dac.s + dac.ms / 1000) + '"';
        } else { // 设置
            let r = str.match(/^([-+]?\d+)[^\d-+]+(?:(\d+)[^\d-+]+(?:(\d+)(?:.(\d+))?[^\d-+]*)?)?/);
            if (r) {
                r[4]  = r[4] ? '0.' + r[4] : '0';
                angle = { 
                    dac: {
                        d: parseInt(r[1]),
                        m: parseInt(r[2]),
                        s: r[3] ? parseInt(r[3]) : 0,
                        ms: parseFloat(r[4]) * 1000
                    }
                };

                if (angle.dac.d < 0) {
                    angle.dac.m = - angle.dac.m;
                    angle.dac.s = - angle.dac.s;
                    angle.dac.ms = - angle.dac.ms;
                };
            } else {
                throw Error('Illagelity parameters.');
            }
            return this;
        }
    }

    this.HACString = function(str) {
        if (str === undefined) { // 获取
            var hac = this.DAComplex();
            return hac.d + 'h' + hac.m + 'm' + hac.s + 's' + hac.ms + 'ms';
        } else { // 设置
            let r = a.match(/^([-+]?\d+)[^\d-+]+(?:(\d+)[^\d-+]+(?:(\d+)(?:.(\d+))?[^\d-+]*)?)?/);
            if (r) {
                r[4]  = r[4] ? '0.' + r[4] : '0';
                angle = { 
                    dac: {
                        d: parseInt(r[1]),
                        m: parseInt(r[2]),
                        s: r[3] ? parseInt(r[3]) : 0,
                        ms: parseFloat(r[4]) * 1000
                    }
                };

                if (angle.dac.d < 0) {
                    angle.dac.m = - angle.dac.m;
                    angle.dac.s = - angle.dac.s;
                    angle.dac.ms = - angle.dac.ms;
                };
            } else {
                throw Error('Illagelity parameters.');
            }
        }
        return this;
    }

    this.toString = function(unit) {
        if (unit == undefined || unit == 'dac') return this.DACString();
        else if (unit == 'hac') return this.HACString();
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
        if (max - min >= 360) {

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

    // 初始值设定
    if (typeof num === 'number') _cp(unit, num);
    else if (typeof num === 'object') {
        if (unit == 'dac') this.DAComplex(num);
        if (unit == 'hac') this.HAComplex(num);
    }
    else if (typeof num === 'string') {
        if (unit == 'dacs') this.DACString(num);
        if (unit == 'hacs') this.HACString(num);
    }
};