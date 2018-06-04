let Angle = require('../index');
let expect = require("chai").expect;

describe('#index.js', () => {
	describe('#__constructor()', () => {
		it('should return ', () => {
			expect((new Angle(1, 'd')).milliseconds()).equal((new Angle()).degrees(1).milliseconds());
		});
	});
});