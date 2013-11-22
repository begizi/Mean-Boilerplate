/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    Machine = mongoose.model('Machine');

//Globals
var machine;

//The tests
describe('<Unit Test>', function() {
    describe('Model Machine:', function() {

        before(function(done) {

            machine = new Machine({
                aggragateContext: 'VYYKN_0001',
                status: 'SERVICE',
                model: 'V-MAC',
                name: 'Test Demo Machine',
                location: {
                    timezone: 'America/Boise',
                    lat: 100.999,
                    long: 100.999,
                    street: '390 E Corperate Dr',
                    city: 'Meridian',
                    state: 'ID',
                    zip: 83642,
                    description: 'Located inside the office'
                }
            });

            machineDuplicate = new Machine({
                aggragateContext: 'VYYKN_0002',
                status: 'SERVICE',
                model: 'V-MAC',
                name: 'Test Demo Machine 2',
                timezone: 'America/Boise',
                location: {
                    lat: 100.999,
                    long: 100.999,
                    street: '390 E Corperate Dr',
                    city: 'Meridian',
                    state: 'ID',
                    zip: 83642,
                    description: 'Located inside the office'
                }
            });

            done();
        });

        describe('Method Save', function() {

            it('should begin with no machines', function(done) {
                Machine.find({}, function(err, machines) {
                    machines.should.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function(done) {
                machine.save(done);
            });
            
        });



        describe('Method Validate', function(){

            it('should fail to save if duplicate aggragateContext', function(done) {
                machine.save();
                machineDuplicate.aggragateContext = 'VYYKN_0001';
                return machineDuplicate.save(function(err) {
                    should.exist(err);
                    err.errors.aggragateContext.message.should.equal('Aggragate Context already exists');
                    done();
                });
            });

            it('should fail to save if duplicate name', function(done) {
                machine.save();
                machineDuplicate.name = 'Test Demo Machine';
                return machineDuplicate.save(function(err) {
                    should.exist(err);
                    err.errors.name.message.should.equal('Machine Name already exists');
                    done();
                });
            });

            it('should fail to save if missing name', function(done) {
                machine.save();
                machine.name = '';
                return machine.save(function(err) {
                    should.exist(err);
                    err.errors.name.message.should.equal('Machine name cannot be blank');
                    done();
                });
            });

            it('should fail to save if missing aggragateContext', function(done) {
                machine.save();
                machine.aggragateContext = '';
                return machine.save(function(err) {
                    should.exist(err);
                    err.errors.aggragateContext.message.should.equal('Machine Aggragate Context cannot be blank');
                    done();
                });
            });

        });

        after(function(done) {
            machine.remove();
            done();
        });

    });
});