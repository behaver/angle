let Angle = require('../index');
let expect = require("chai").expect;

describe('#index.js', () => {
	describe('#__constructor()', () => {
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
            expect((new Angle(1, 's')).DAComplex()).to.deep.equal({ d: 0, m: 0, s: 1, ms: 0 });
        });
    });
});