const PaymentPackage = require('./index');
const expect = require('chai').expect;

describe('PaymentPackage', function () {
    const validName = 'New Package';
    const validValue = 50;
    describe('Instantiation and structure', function () {
        it('should works with valid params', function () {
            expect(() => new PaymentPackage(validName, validValue)).to.not.throw();
        });

        it('should correctly set up', function () {
            const newInstance = new PaymentPackage(validName, validValue);
            expect(newInstance.name).to.equal(validName);
            expect(newInstance.value).to.equal(validValue);
            expect(newInstance.VAT).to.equal(20);
            expect(newInstance.active).to.be.true;
        });

        it('should throw error with invalid name', function () {
            expect(() => new PaymentPackage(undefined, validValue)).to.throw();
            expect(() => new PaymentPackage('', validValue)).to.throw();
            expect(() => new PaymentPackage({}, validValue)).to.throw();
        });

        it('should throw error with invalid value', function () {
            expect(() => new PaymentPackage(validName, '')).to.throw();
            expect(() => new PaymentPackage(validName, -10)).to.throw();
            expect(() => new PaymentPackage(validName, undefined)).to.throw();
        });

        it('should has all properties', function () {
            const instance = new PaymentPackage(validName, validValue);

            expect(instance).to.have.property('name');
            expect(instance).to.have.property('value');
            expect(instance).to.have.property('VAT');
            expect(instance).to.have.property('active');
        });
    });

    describe('Accessors', function () {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage(validName, validValue);
        });

        it('should accept and set valid name', function() {
            instance.name = 'New Name';
            expect(instance.name).to.be.equal('New Name');
        });

        it('should reject invalid name', function() {
            expect(() => instance.name = undefined).to.throw();
            expect(() => instance.name = '').to.throw();
            expect(() => instance.name = {}).to.throw();
        });

        it('should accept and set valid value', function() {
            instance.value = 40;
            expect(instance.value).to.be.equal(40);
        });

        it('should reject invalid value', function() {
            expect(() => instance.value = undefined).to.throw();
            expect(() => instance.value = 'string').to.throw();
            expect(() => instance.value = {}).to.throw();
        });

        it('should accept and set valid VAT', function() {
            instance.VAT = 40;
            expect(instance.VAT).to.be.equal(40);
        });

        it('should reject invalid VAT', function() {
            expect(() => instance.VAT = undefined).to.throw();
            expect(() => instance.VAT = 'string').to.throw();
            expect(() => instance.VAT = {}).to.throw();
        });

        it('should accept and set valid active', function() {
            instance.active = false;
            expect(instance.active).to.be.equal(false);
        });

        it('should reject invalid active', function() {
            expect(() => instance.active = undefined).to.throw();
            expect(() => instance.active = 'string').to.throw();
            expect(() => instance.active = 5).to.throw();
        });
    });

    describe('ToString Function Tests', function() {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage(validName, validValue);
        });

        it('should contain the name', function() {
            expect(instance.toString()).to.contain(validName);
        });

        it('should contain the value', function() {
            expect(instance.toString()).to.contain(validValue);
        });

        it('should contain the VAT', function() {
            expect(instance.toString()).to.contain(instance.VAT + '%');
        });

        it('should display inactive label', function() {
            instance.active = false;
            expect(instance.toString()).to.contain('(inactive)')
        });
    });
});