/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    Dispense = mongoose.model('Dispense');

//Globals
var dispense;

//The tests
describe('<Unit Test>', function() {
    describe('Model Dispense:', function() {

        before(function(done) {

            dispense = new Dispense({
                createdAt: Date.now(),
                type: 'ION',
                voume: 1.2,
                sourceTDS: 308.3,
                TDS: 35.4,
                OXY: 126,
                PH: 8.7
            });

            done();
        });

        describe('Method Save', function() {

            it('should begin with no dispenses', function(done) {
                Dispense.find({}, function(err, dispenses) {
                    dispenses.should.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function(done) {
                dispense.save(done);
            });
            
        });


        after(function(done) {
            dispense.remove();
            done();
        });

    });
});