const lib = require('./index');
const expect = require('chai').expect;

describe('MathEnforcerTests', function() {
    describe('AddFiveMethodTests', function() {
        it('should return undefined with non-number argument ', function() {
            const nonNumberArgument = 'str';
            const result = lib.mathEnforcer.addFive(nonNumberArgument);
            expect(result).to.be.undefined;
        });
        it('should add five when argument is correct type', function() {
            const correctArgument = 5;
            const result = lib.mathEnforcer.addFive(correctArgument);
            expect(result).to.be.equal(10);
        });
        it('should return correct result with floating point nums', function() {
            const correctArgument = 5.1;
            const result = lib.mathEnforcer.addFive(correctArgument);
            expect(result).to.be.closeTo(10, 10.2);
        })
        it('should return correct result with negative numbers', function() {
            const negativeNumber = -6;
            const result = lib.mathEnforcer.addFive(negativeNumber);
            expect(result).to.be.equal(-1);
        });
    });

    describe('SubtractTenMethodTests', function() {
        it('should return undefined with non-number argument ', function() {
            const nonNumberArgument = 'str';
            const result = lib.mathEnforcer.subtractTen(nonNumberArgument);
            expect(result).to.be.undefined;
        });

        it('should subtract ten when argument is correct type', function() {
            const correctArgument = 20;
            const result = lib.mathEnforcer.subtractTen(correctArgument);
            expect(result).to.be.equal(10);
        });

        it('should return correct result with floating point nums', function() {
            const correctArgument = 20.1;
            const result = lib.mathEnforcer.subtractTen(correctArgument);
            expect(result).to.be.closeTo(10, 10.2);
        })

        it('should return correct result with negative numbers', function() {
            const negativeNumber = -5;
            const result = lib.mathEnforcer.subtractTen(negativeNumber);
            expect(result).to.be.equal(-15);
        });
    });

    describe('SumMethodTests', function() {
        it('should return undefind with non-number first argument', function() {
            const nonNumberFirstArg = 'str';
            const validSecondArg = 5;
            const result = lib.mathEnforcer.sum(nonNumberFirstArg, validSecondArg);
            expect(result).to.be.undefined;
        });

        it('should return undefind with non-number second argument', function() {
            const validFirstArg = 5;
            const nonNumberSecondArg = 'str';
            const result = lib.mathEnforcer.sum(validFirstArg, nonNumberSecondArg);
            expect(result).to.be.undefined;
        });

        it('should return correct result with valid arguments', function() {
            const validFirstArg = 5;
            const validSecondArg = 5;
            const result = lib.mathEnforcer.sum(validFirstArg, validSecondArg);
            expect(result).to.be.equal(10);
        });

        it('should return correct result with floating point nums', function() {
            const validFirstArg = 5.1;
            const validSecondArg = 5.1;
            const result = lib.mathEnforcer.sum(validFirstArg, validSecondArg);
            expect(result).to.be.closeTo(10, 10.3);
        })

        it('should return correct result with negative numbers', function() {
            const validFirstArg = -5;
            const validSecondArg = -5;
            const result = lib.mathEnforcer.sum(validFirstArg, validSecondArg);
            expect(result).to.be.equal(-10);
        });
    });
});