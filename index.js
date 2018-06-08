'use strict';

/**
 * Angle
 * 
 * Angle 对象用于处理各种角度数值
 *
 * @param  {number} num  需设置的角度数值，缺省为 0
 * @param  {string} unit 数值单位，缺省为'd'，有下列可选值：
 *   'd'    角度
 *   'm'    角分
 *   's'    角秒
 *   'ms'   角毫秒
 *   'r'    弧度
 *   'th'   时角时
 *   'tm'   时角分
 *   'ts'   时角秒
 *   'tms'  时角毫秒
 *   'hac'  复合时角对象
 *   'dac'  复合度角对象
 *   'hacs' 复合时角字符串
 *   'dacs' 复合度角字符串
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.1.2
 */
module.exports = function (num, unit) {

    const self = this;

    // 各类角度单位数值的缓存对象，以减少重复运算
    var angle = {};

    // 角度对应转换的毫秒值，是模块的必要 基础值
    var milliseconds = 0;

    // 各种角度单位与毫秒之间的 转换比例 映射
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
     * 设置/获取 方法的公共过程
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {string} unit 数值单位
     * @param  {number} num  需设置的角度数值
     * @return {mixed}       设置时返回 this 引用，获取时返回角度数值
     */
    function _cp(unit, num) {
        if (unit && unit in scalesMap) {
            if (num === undefined) { // GET 过程：
                if (angle[unit] === undefined) {
                    return angle[unit] = milliseconds / scalesMap[unit];
                } else {
                    return angle[unit];
                }
            } else { // SET 过程：
                angle = {};
                angle[unit] = num;
                milliseconds = num * scalesMap[unit];
                return self;
            };
        } else throw Error('Unknow angle unit.');
    }

    /**
     * 以 角毫秒 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 角毫秒 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 角毫秒 数值
     */
    this.milliseconds = function (num) {
        if (num === undefined) { // GET 过程：
            return milliseconds;
        } else { // SET 过程：
            angle = {};
            milliseconds = num;
            return this;
        }
    }

    /**
     * 以 角秒 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 角秒 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 角秒 数值
     */
    this.seconds = function (num) {
        return _cp('s', num);
    }

    /**
     * 以 角分 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 角分 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 角分 数值
     */
    this.minutes = function (num) {
        return _cp('m', num);
    }

    /**
     * 以 角度 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 角度 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 角度 数值
     */
    this.degrees = function (num) {
        return _cp('d', num);
    }

    /**
     * 以 弧度 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 弧度 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 弧度 数值
     */
    this.radian = function (num) {
        return _cp('r', num);
    }

    /**
     * 以 时角时 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 时角时 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 时角时 数值
     */
    this.tHours = function (num) {
        return _cp('th', num);
    }

    /**
     * 以 时角分 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 时角分 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 时角分 数值
     */
    this.tMinutes = function (num) {
        return _cp('tm', num);
    }

    /**
     * 以 时角秒 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 时角秒 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 时角秒 数值
     */
    this.tSeconds = function (num) {
        return _cp('ts', num);
    }

    /**
     * 以 时角毫秒 为单位，获取/设置 角度数值
     *
     * 参数 num 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param  {number} num 需设置的 时角毫秒 数值
     * @return {mixed}      设置时返回 this 引用，获取时返回 时角毫秒 数值
     */
    this.tMilliseconds = function (num) {
        return _cp('tms', num);
    }

    /**
     * 以 复合时角 获取/设置 角度数值
     *
     * 参数 h 缺省时，函数为获取方法，否则为设置方法
     *
     * @param  {mixed}  h  可以是 复合时角 对象，则后续 m、s、ms 参数无效，或者是复合时角中 时角时部分 数值，配合后续参数设定角度数值
     * @param  {number} m  需设置的复合时角中 时角分部分 的数值
     * @param  {number} s  需设置的复合时角中 时角秒部分 的数值
     * @param  {number} ms 需设置的复合时角中 时角毫秒部分 的数值
     * @return {mixed}     设置时返回 this 引用，获取时返回 复合时角 数值对象
     */
    this.HAComplex = function (h, m, s, ms) {
        if (h === undefined) { // GET 过程：
            if (angle.hac === undefined) { // 生成 复合时角 对象
                angle.hac = {};
                let _m = milliseconds;
                angle.hac.h = Math.floor(_m / scalesMap['th']);
                _m -= angle.hac.h * scalesMap['th'];
                angle.hac.m = Math.floor(_m / scalesMap['tm']);
                _m -= angle.hac.m * scalesMap['tm'];
                angle.hac.s = Math.floor(_m / scalesMap['ts']);
                _m -= angle.hac.s * scalesMap['ts'];
                angle.hac.ms = _m / scalesMap['tms'];
                return angle.hac;
            } else return angle.hac;
        } else { // SET 过程：
            if (typeof(h) === 'object') {
                var _h = h.h == undefined ? 0 : Math.floor(h.h);
                var _m = h.m == undefined ? 0 : Math.floor(h.m);
                var _s = h.s == undefined ? 0 : Math.floor(h.s);

                // 考虑 s 为小数及 ms 是否设定的情况
                let _sms = h.s % 1 * 1000;
                if (_sms && h.ms == undefined) var _ms = _sms;
                else var _ms = h.ms == undefined ? 0 : parseFloat(h.ms);
            } else if (typeof(h) === 'number' || typeof(h) === 'string') {
                var _h = h == undefined ? 0 : Math.floor(h);
                var _m = m == undefined ? 0 : Math.floor(m);
                var _s = s == undefined ? 0 : Math.floor(s);

                // 考虑 s 为小数及 ms 是否设定的情况
                let _sms = s % 1 * 1000;
                if (_sms && ms == undefined) var _ms = _sms;
                else var _ms = ms == undefined ? 0 : parseFloat(ms);
            } else throw Error('Illagelity parameters.');

            if (_m >= 60 || _m <= -60) throw Error('The range of tMinutes must be (-60, 60).');
            if (_s >= 60 || _s <= -60) throw Error('The range of tSeconds must be (-60, 60).');
            if (_ms >= 1000 || _ms <= -1000) throw Error('The range of tMilliseconds must be (-1000, 1000).');
            
            if (_h >= 0 && _m >= 0 && _s >= 0 && _ms >= 0 || _h <= 0 && _m <= 0 && _s <= 0 && _ms <= 0) { // 组成数值的正负需一致
                angle = {
                    hac: { h: _h, m: _m, s: _s, ms: _ms }
                };

                milliseconds = angle.hac.h * scalesMap['th'] + angle.hac.m * scalesMap['tm'] + angle.hac.s * scalesMap['ts'] + angle.hac.ms * scalesMap['tms'];
            } else throw Error('The signs must be consistent');

            return this;
        }
    }

    /**
     * 以 复合度角 获取/设置 角度数值
     *
     * 参数 d 缺省时，函数为获取方法，否则为设置方法
     *
     * @param  {mixed}  d  可以是 复合度角 对象，则后续 m、s、ms 参数无效，或者是复合度角中 度角度部分 数值，配合后续参数设定角度数值
     * @param  {number} m  需设置的复合度角中 度角分部分 的数值
     * @param  {number} s  需设置的复合度角中 度角秒部分 的数值
     * @param  {number} ms 需设置的复合度角中 度角毫秒部分 的数值
     * @return {mixed}     设置时返回 this 引用，获取时返回 复合度角 数值对象
     */
    this.DAComplex = function (d, m, s, ms) {
        if (d === undefined) { // GET 过程：
            if (angle.dac === undefined) { // 生成 复合时角 对象
                angle.dac = {};
                let _m = milliseconds;
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
        } else { // SET 过程：
            if (typeof(d) === 'object') {
                var _d = d.d == undefined ? 0 : Math.floor(d.d);
                var _m = d.m == undefined ? 0 : Math.floor(d.m);
                var _s = d.s == undefined ? 0 : Math.floor(d.s);

                // 考虑 s 为小数及 ms 是否设定的情况
                let _sms = d.s % 1 * 1000;
                if (_sms && d.ms == undefined) var _ms = _sms;
                else var _ms = d.ms == undefined ? 0 : parseFloat(d.ms);
            } else if (typeof(d) === 'number' || typeof(d) === 'string') {
                var _d = d == undefined ? 0 : Math.floor(d);
                var _m = m == undefined ? 0 : Math.floor(m);
                var _s = s == undefined ? 0 : Math.floor(s);

                // 考虑 s 为小数及 ms 是否设定的情况
                let _sms = s % 1 * 1000;
                if (_sms && ms == undefined) var _ms = _sms;
                else var _ms = ms == undefined ? 0 : parseFloat(ms);
            } else throw Error('Illagelity parameters.');

            if (_m >= 60 || _m <= -60) throw Error('The range of tMinutes must be (-60, 60).');
            if (_s >= 60 || _s <= -60) throw Error('The range of tSeconds must be (-60, 60).');
            if (_ms >= 1000 || _ms <= -1000) throw Error('The range of tMilliseconds must be (-1000, 1000).');

            if (_d >= 0 && _m >= 0 && _s >= 0 && _ms >= 0 || _d <= 0 && _m <= 0 && _s <= 0 && _ms <= 0) { // 组成数值的正负需一致
                angle = {
                    dac: { d: _d, m: _m, s: _s, ms: _ms }
                };

                milliseconds = angle.dac.d * scalesMap['d'] + angle.dac.m * scalesMap['m'] + angle.dac.s * scalesMap['s'] + angle.dac.ms * scalesMap['ms'];
            } else throw Error('The signs must be consistent');

            return this;
        }
    }

    /**
     * 以 复合度角字符串 获取/设置 角度数值
     *
     * 参数 str 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param {string} str 需设置的 复合度角 字符串
     * @return {mixed}     设置时返回 this 引用，获取时返回 复合度角 字符串
     */
    this.DACString = function(str) {
        if (str === undefined) { // GET 过程：
            let dac = this.DAComplex();
            if (dac.d < 0 || dac.m < 0 || dac.s < 0 || dac.ms < 0) { // 负角度值字符串生成
                return '-' + Math.abs(dac.d) + '°' + Math.abs(dac.m) + '′' + Math.abs(dac.s + dac.ms / 1000).toFixed(3) + '″';
            } else return dac.d + '°' + dac.m + '′' + (dac.s + dac.ms / 1000).toFixed(3) + '″';
        } else { // SET 过程：
            let r = str.match(/^([-+]?\d+)[°|d]\s*(?:(\d+)[′|m]\s*(?:(\d+)(?:\.(\d+))?[″|s]\s*(?:(\d+)ms\s*)?)?)?/);
            if (r) {
                // 两种 ms 字符串给定方式的判别处理
                if (r[5] !== undefined) var _ms = parseFloat(r[5]);
                else var _ms  = r[4] ? parseFloat('0.' + r[4]) * 1000 : 0;

                let dac = {
                    d: r[1] ? parseInt(r[1]) : 0,
                    m: r[2] ? parseInt(r[2]) : 0,
                    s: r[3] ? parseInt(r[3]) : 0,
                    ms: _ms,
                };

                if (dac.d < 0) { // 负值角度的组成数值一致为负
                    dac.m = -dac.m;
                    dac.s = -dac.s;
                    dac.ms = -dac.ms;
                };

                this.DAComplex(dac);
            } else throw Error('Illagelity parameters.');

            return this;
        }
    }

    /**
     * 以 复合时角字符串 获取/设置 角度数值
     *
     * 参数 str 缺省时，函数为获取方法，否则为设置方法
     * 
     * @param {string} str 需设置的 复合时角 字符串
     * @return {mixed}     设置时返回 this 引用，获取时返回 复合时角 字符串
     */
    this.HACString = function(str) {
        if (str === undefined) { // GET 过程：
            let hac = this.HAComplex();
            if (hac.h < 0 || hac.m < 0 || hac.s < 0 || hac.ms < 0) { // 负角度值字符串生成
                return '-' + Math.abs(hac.h) + 'h ' + Math.abs(hac.m) + 'm ' + Math.abs(hac.s) + 's ' + Math.abs(hac.ms).toFixed(2) + 'ms';
            } else return hac.h + 'h ' + hac.m + 'm ' + hac.s + 's ' + hac.ms.toFixed(2) + 'ms';
        } else { // SET 过程：
            let r = str.match(/^([-+]?\d+)h\s*(?:(\d+)m\s*(?:(\d+)(?:\.(\d+))?s\s*(?:(\d+)ms\s*)?)?)?/);
            if (r) {
                // 两种 ms 字符串给定方式的判别处理
                if (r[5] !== undefined) var _ms = parseFloat(r[5]);
                else var _ms  = r[4] ? parseFloat('0.' + r[4]) * 1000 : 0;

                let hac = { 
                    h: r[1] ? parseInt(r[1]) : 0,
                    m: r[2] ? parseInt(r[2]) : 0,
                    s: r[3] ? parseInt(r[3]) : 0,
                    ms: _ms,
                };

                if (hac.h < 0) { // 负值角度的组成数值一致为负
                    hac.m = -hac.m;
                    hac.s = -hac.s;
                    hac.ms = -hac.ms;
                };

                this.HAComplex(hac);
            } else throw Error('Illagelity parameters.');

            return this;
        }
    }

    /**
     * 获取 复合度角\时角 字符串
     * 
     * @param  {string} unit 设定为 'dac' 或 缺省 时，方法返回 复合度角 字符串；设定为 'hac' 时，方法返回 复合时角 字符串；
     * @return {string}      复合度角\时角 字符串
     */
    this.toString = function(unit) {
        if (unit == undefined || unit == 'dac') return this.DACString();
        else if (unit == 'hac') return this.HACString();
    }

    /**
     * 转换角度至 [from, from+360°) 的数值范围
     * 
     * @param  {number} from 限定圆周范围的起始角度数值，缺省为 0
     * @param  {number} unit 设定起始角度数值的 单位，缺省为 'd'，有下列可选值：
     *   'd'   角度
     *   'm'   角分
     *   's'   角秒
     *   'ms'  角毫秒
     *   'r'   弧度
     *   'th'  时角时
     *   'tm'  时角分
     *   'ts'  时角秒
     *   'tms' 时角毫秒
     * @return {object}      返回 this 引用
     */
    this.inRound = function (from, unit) {
        if (from == undefined) from = 0;
        if (unit == undefined) unit = 'd';
        if (unit in scalesMap) {
            let from_ms = from * scalesMap[unit];
            let T_ms = 1296000000;
            milliseconds += Math.ceil((from_ms - milliseconds) / T_ms) * T_ms;
            angle = {};
        } else throw Error('unknow unit.');
        return this;
    }

    // 模块初始参数构造过程：
    if (typeof num === 'number') _cp(unit, num);
    else if (typeof num === 'object') {
        if (unit == 'dac') this.DAComplex(num);
        if (unit == 'hac') this.HAComplex(num);
    } else if (typeof num === 'string') {
        if (unit == 'dacs') this.DACString(num);
        if (unit == 'hacs') this.HACString(num);
    }
};