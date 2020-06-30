const lib = require('./index');
const expect = require('chai').expect;

describe('oddOrEven Tests', function() {
    it('should return underfined when number is passed', function() {
        const arg = 12;
        const result = lib.oddOrEven(arg);
        expect(result).to.be.undefined;
    });

    it('should return even when argument length is even', function() {
        const arg = 'rock';
        const result = lib.oddOrEven(arg);
        expect(result).to.eq('even');
    });

    it('should return odd when argument length is odd', function() {
        const arg = 'cat';
        const result = lib.oddOrEven(arg);
        expect(result).to.eq('odd');
    });
});