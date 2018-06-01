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

    if (typeof num === 'number') {
        switch (unit) {
            case 'ms':
                this.milliseconds(num);
                break;
            default:
                this.degree(num);
        }
    }

    /**
     * 获取或设置毫秒值
     * @param  {[type]} ms [description]
     * @return {[type]}    [description]
     */
    this.milliseconds = function (ms) {
        if (ms === undefined) { // 获取毫秒值
            return milliseconds;
        } else { // 设置毫秒值
            angle = {};
            milliseconds = ms;
            return this;
        }
    }

    /**
     * 获取或设置角秒值
     * @param  {[type]} s [description]
     * @return {[type]}      [description]
     */
    this.seconds = function (s) {
        if (s === undefined) { // 获取角秒值
            if (angle.seconds === undefined) {
                return angle.seconds = milliseconds / 1000;
            } else {
                return angle.seconds;
            }
        } else { // 设置角秒值
            angle = {"seconds": s};
            milliseconds = s * 1000;
            return this;
        };
    }

    /**
     * 获取或设置角分值
     * @param  {[type]} m [description]
     * @return {[type]}   [description]
     */
    this.minutes = function (m) {
        if (m === undefined) { // 获取角分值
            if (angle.minutes === undefined) {
                return angle.minutes = milliseconds / 60000;
            } else {
                return angle.minutes;
            }
        } else { // 设置角分值
            angle = {"minutes": m};
            milliseconds = m * 60000;
            return this;
        };
    }

    /**
     * 获取或设置时角时
     * @return {[type]} [description]
     */
    this.timeHours = function (hours) {
        if (hours === undefined) { // 获取角时值
            if (angle.timeHours === undefined) {
                return angle.timeHours = milliseconds / 54000000;
            } else {
                return angle.timeHours;
            }
        } else { // 设置角时值
            angle = {"timeHours": hours};
            milliseconds = hours * 54000000;
            return this;
        };
    }

    /**
     * 获取或设置时角分
     * @return {[type]} [description]
     */
    this.timeMinutes = function (minutes) {
        if (minutes === undefined) { // 获取角时值
            if (angle.timeMinutes === undefined) {
                return angle.timeMinutes = milliseconds / 900000;
            } else {
                return angle.timeMinutes;
            }
        } else { // 设置角时值
            angle = {"timeMinutes": minutes};
            milliseconds = minutes * 900000;
            return this;
        };
    }

    /**
     * 获取或设置时角秒
     * @return {[type]} [description]
     */
    this.timeSeconds = function (seconds) {
        if (seconds === undefined) { // 获取角时值
            if (angle.timeSeconds === undefined) {
                return angle.timeSeconds = milliseconds / 15000;
            } else {
                return angle.timeSeconds;
            }
        } else { // 设置角时值
            angle = {"timeSeconds": seconds};
            milliseconds = seconds * 15000;
            return this;
        };
    }

    /**
     * 获取或设置时角毫秒
     * @return {[type]} [description]
     */
    this.timeMilliseconds = function (seconds) {
        if (seconds === undefined) { // 获取角时值
            if (angle.timeMilliseconds === undefined) {
                return angle.timeMilliseconds = milliseconds / 15;
            } else {
                return angle.timeMilliseconds;
            }
        } else { // 设置角时值
            angle = {"timeMilliseconds": seconds};
            milliseconds = seconds * 15;
            return this;
        };
    }

    /**
     * 获取或设置时角值
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
     * 获取或设置角度值
     * @param  {[type]} degree [description]
     * @return {[type]}        [description]
     */
    this.degree = function (degree) {
        if (degree === undefined) { // 获取角度值
            if (angle.degree === undefined) {
                return angle.degree = milliseconds / 3600000;
            } else {
                return angle.degree;
            }
        } else { // 设置角度值
            angle = {"degree": degree};
            milliseconds = degree * 3600000;
            return this;
        };
    }

    /**
     * 获取或设置弧度值
     * @param  {[type]} radian [description]
     * @return {[type]}        [description]
     */
    this.radian = function (radian) {
        if (radian === undefined) { // 获取弧度值
            if (angle.radian === undefined) {
                return angle.radian = milliseconds / 648000000 * Math.PI;
            } else {
                return angle.radian;
            }
        } else { // 设置弧度值
            angle = {"radian": radian};
            milliseconds = radian * 648000000 / Math.PI;
            return this;
        };
    }

    /**
     * 将角度转换为一周之内
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