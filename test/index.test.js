let Angle = require('../index');
let expect = require("chai").expect;

describe('#index.js', () => {
	describe('#constructor', () => {
		it('`new Angle(..., "d")` should equal `(new Angle()).degrees(...)`', () => {
			expect((new Angle(1, 'd')).milliseconds()).equal((new Angle()).degrees(1).milliseconds());
		});
        it('`new Angle(..., "hac")` should equal `(new Angle()).HAComplex(...)`', () => {
            expect((new Angle({ h: 12, m: 23, s: 40 }, 'hac')).milliseconds()).equal((new Angle()).HAComplex({ h: 12, m: 23, s: 40 }).milliseconds());
        });
        it('`new Angle(..., "dacs")` should equal `(new Angle()).DACString(...)`', () => {
            expect((new Angle('124°43′34.065″', 'dacs')).milliseconds()).equal((new Angle()).DACString('124°43′34.065″').milliseconds());
        })
	});

    describe('#_cp()', () => {
        it('1° = 60′ = 3600″ = 360000ms', () => {
            expect((new Angle(1, 'd')).milliseconds())
                .equal((new Angle(60, 'm')).milliseconds())
                .equal((new Angle(3600, 's')).milliseconds())
                .equal((new Angle(3600000, 'ms')).milliseconds());
        });
        it('π = 180°', () => {
            expect((new Angle(Math.PI, 'r')).milliseconds())
                .equal((new Angle(180, 'd')).milliseconds());
        });
        it('15° = 1th = 60tm = 3600ts = 3600000tms', () => {
            expect((new Angle(15, 'd')).milliseconds())
                .equal((new Angle(1, 'th')).milliseconds())
                .equal((new Angle(60, 'tm')).milliseconds())
                .equal((new Angle(3600, 'ts')).milliseconds())
                .equal((new Angle(3600000, 'tms')).milliseconds())
        })
    });

    describe('#HAComplex()', () => {
        it('`HAComplex({ ... })` should equal `HAComplex(h, m, s, ms)`', () => {
            expect((new Angle).HAComplex({ h: 12, m: 24, s: 48, ms: 512 }).milliseconds()).equal((new Angle).HAComplex(12, 24, 48, 512).milliseconds());
        });
        it('`HAComplex(1, 1, 1, 1) should equal `milliseconds(54915015)`', () => {
            expect((new Angle({ h: 1, m: 1, s: 1, ms: 1 }, 'hac')).milliseconds()).equal(54915015);
        });
        it('`tMilliseconds(1).HAComplex()` should equal { h: 0, m: 0, s: 0, ms: 1 }', () => {
            expect((new Angle(1, 'tms')).HAComplex()).to.deep.equal({ h: 0, m: 0, s: 0, ms: 1 });
        });
    });

    describe('#DAComplex()', () => {
        it('`DAComplex({ ... })` should equal `DAComplex(d, m, s, ms)`', () => {
            expect((new Angle).DAComplex({ d: 12, m: 24, s: 48, ms: 512 }).milliseconds()).equal((new Angle).DAComplex(12, 24, 48, 512).milliseconds());
        });
        it('`DAComplex(1, 1, 1, 1) should equal `milliseconds(3661001)`', () => {
            expect((new Angle({ d: 1, m: 1, s: 1, ms: 1 }, 'dac')).milliseconds()).equal(3661001);
        });
        it('`seconds(1).DAComplex()` should equal { d: 0, m: 0, s: 1, ms: 0 }', () => {
            expect((new Angle(1, 's')).DAComplex()).to.deep.equal({ d: 0, m: 0, s: 1, ms: 0.00 });
        });
        // 符号一致性
    });

    describe('#DACString()', () => {
        it('`(new Angle({ d: 128, m: 56, s: 28, ms: 52 }, "dac")).DACString()` should equal `128°56′28.052″`', () => {
            expect((new Angle({ d: 128, m: 56, s: 28, ms: 52 }, "dac")).DACString()).equal('128°56′28.052″');
        });
        it('`DACString("128°56′28.45″").DAComplex()` should equal `{ d: 128, m: 56, s: 28, ms: 450 }`', () => {
            expect((new Angle).DACString("128°56′28.45″").DAComplex()).to.deep.equal({ d: 128, m: 56, s: 28, ms: 450 });
        });
        it('`DACString("128d 56m 28s 45ms").DAComplex()` should equal `{ d: 128, m: 56, s: 28, ms: 45 }`', () => {
            expect((new Angle).DACString("128d 56m 28s 45ms").DAComplex()).to.deep.equal({ d: 128, m: 56, s: 28, ms: 45 });
        });
    });

    describe('#HACString()', () => {
        it('`(new Angle({ h: 12, m: 0, s: 28, ms: 512 }, "hac")).HACString()` should equal `12h 0m 28s 512ms`', () => {
            expect((new Angle({ h: 12, m: 0, s: 28, ms: 512 }, "hac")).HACString()).equal('12h 0m 28s 512.00ms');
        });
        it('`HACString("128h 56m 28s 45ms").HAComplex()` should equal `{ h: 128, m: 56, s: 28, ms: 45 }`', () => {
            expect((new Angle).HACString("128h 56m 28s 45ms").HAComplex()).to.deep.equal({ h: 128, m: 56, s: 28, ms: 45 });
        });
        it('`HACString("128h 56m 28.45s").HAComplex()` should equal `{ h: 128, m: 56, s: 28, ms: 450 }`', () => {
            expect((new Angle).HACString("128h 56m 28.45s").HAComplex()).to.deep.equal({ h: 128, m: 56, s: 28, ms: 450 });
        });
    });

    describe('#toString()', () => {
        it('toString() has no params.', () => {
            expect((new Angle(12223443, 'ms')).toString()).equal('3°23′43.443″');
        });
        it('toString("hac")', () => {
            expect((new Angle(122234430, 'ms')).toString('hac')).equal('2h 15m 48s 962.00ms');
        });
    });

    describe('#inRound()', () => {
        it('360° inRound from 361° should equal 720°', () => {
            expect((new Angle(360, 'd')).inRound(361, 'd').degrees()).equal(720);
        });
        it('361° inRound from 361° should equal 361°', () => {
            expect((new Angle(361, 'd')).inRound(361, 'd').degrees()).equal(361);
        });
        it('362° inRound from 361° should equal 362°', () => {
            expect((new Angle(362, 'd')).inRound(361, 'd').degrees()).equal(362);
        });
        it('720° inRound from 361° should equal 720°', () => {
            expect((new Angle(720, 'd')).inRound(361, 'd').degrees()).equal(720);
        });
        it('721° inRound from 361° should equal 361°', () => {
            expect((new Angle(721, 'd')).inRound(361, 'd').degrees()).equal(361);
        });
        it('722° inRound from 361° should equal 362°', () => {
            expect((new Angle(722, 'd')).inRound(361, 'd').degrees()).equal(362);
        });
        it('359° inRound from 2π should equal 719°', () => {
            expect((new Angle(359, 'd')).inRound(2 * Math.PI, 'r').degrees()).equal(719);
        });
        it('2π inRound from 361° should equal 720°', () => {
            expect((new Angle(2 * Math.PI, 'r')).inRound(361, 'd').degrees()).equal(720);
        });
        it('-1° inRound should equal 359°', () => {
            expect((new Angle(-1, 'd')).inRound().degrees()).equal(359);
        });
        it('0° inRound should equal 0°', () => {
            expect((new Angle(0, 'd')).inRound().degrees()).equal(0);
        });
        it('1° inRound should equal 1°', () => {
            expect((new Angle(1, 'd')).inRound().degrees()).equal(1);
        });
        it('359° inRound should equal 359°', () => {
            expect((new Angle(359, 'd')).inRound().degrees()).equal(359);
        });
        it('360° inRound should equal 0°', () => {
            expect((new Angle(360, 'd')).inRound().degrees()).equal(0);
        });
        it('361° inRound should equal 1°', () => {
            expect((new Angle(361, 'd')).inRound().degrees()).equal(1);
        });
    });
});