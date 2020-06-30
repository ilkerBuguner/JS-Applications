const lib = require('./index');
const expect = require('chai').expect;

describe('Char Lookup Tests', function() {
    it('should return undefined with incorrect first argument', function() {
        const invalidFirstArgument = 12;
        const validIndex = 1;
        const result = lib.charLookup(invalidFirstArgument, validIndex);
        expect(result).to.be.undefined;
    });

    it('should return undefined with non-number index', function() {
        const validFirstArgument = 'cat';
        const nonNumberIndex = 'str';
        const result = lib.charLookup(validFirstArgument, nonNumberIndex);
        expect(result).to.be.undefined;
    });

    it('should return Incorrect index when index argument is incorrect', function() {
        const validFirstArgument = 'cat';
        const invalidIndex = 10;
        const result = lib.charLookup(validFirstArgument, invalidIndex);
        expect(result).to.be.equal('Incorrect index');
    });

    it('should return the char of the given index in the string', function() {
        const validFirstArgument = 'cat';
        const validIndex = 1;
        const result = lib.charLookup(validFirstArgument, validIndex);
        expect(result).to.be.equal('a');
    });
})