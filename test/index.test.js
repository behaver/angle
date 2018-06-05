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
});