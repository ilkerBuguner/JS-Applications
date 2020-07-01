const StringBuilder = require('./index');
const expect = require('chai').expect;

describe('StringBuilder', function() {
    describe('Instantiation', function() {
        it('should successfully instantiate with undefined argument in constructor', function() {
            const sb = new StringBuilder();
            const result = sb._stringArray.length;
            expect(result).to.be.equal(0);
        });

        it('should successfully instantiate with valid argument and make arr from his chars', function() {
            const sb = new StringBuilder('string');
            const result = sb._stringArray.length;
            expect(result).to.be.equal(6);
        });

        it('should throw error with non-string argument', function () {
            expect(() => new StringBuilder(5).to.throw())
        });
    });

    describe('Append Function Tests', function() {
        let instance = null;
        beforeEach(() => {
            instance = new StringBuilder('cats');
        })

        it('it should successfully append the given string', function() {
            instance.append('AreAwesome');
            const result1 = instance._stringArray.length;
            const result2 = instance._stringArray.join('').substring(4);
            expect(result1).to.be.equal(14);
            expect(result2).to.be.equal('AreAwesome');
        });
        
        it('should throw error with non-string argument', function () {
            expect(() => instance.append(5).to.throw())
        });
    });

    describe('Prepend Function Tests', function() {
        let instance = null;
        beforeEach(() => {
            instance = new StringBuilder('cats');
        })

        it('it should successfully prepend the given string', function() {
            instance.prepend('AreAwesome');
            const result1 = instance._stringArray.length;
            const result2 = instance._stringArray.join('').substring(0, 10);
            expect(result1).to.be.equal(14);
            expect(result2).to.be.equal('AreAwesome');
        });

        it('should throw error with non-string argument', function () {
            expect(() => instance.prepend(5).to.throw())
        });
    });

    describe('InsertAt Function Tests', function() {
        let instance = null;
        beforeEach(() => {
            instance = new StringBuilder('cats');
        })

        it('it should successfully insert the given string at the given position', function() {
            instance.insertAt('test', 2);
            const result = instance._stringArray.join('').substring(2, 6);
            expect(result).to.be.equal('test');
        });

        it('should throw error with non-string first argument', function () {
            expect(() => instance.insertAt(5, 2).to.throw())
        });
    });

    describe('Remove Function Tests', function() {
        let instance = null;
        beforeEach(() => {
            instance = new StringBuilder('cats');
        })

        it('it should successfully remove chars from the given position', function() {
            instance.remove(0, 2);
            const result = instance._stringArray.join('');
            expect(result).to.be.equal('ts');
        });
    });

    describe('ToString Function Tests', function() {
        let instance = null;
        beforeEach(() => {
            instance = new StringBuilder('cats');
        })

        it('it should successfully remove chars from the given position', function() {
            const result = instance.toString();
            expect(result).to.be.equal('cats');
        });
    });
});