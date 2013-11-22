/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    Tag = mongoose.model('Tag');

//Globals
var tag;

//The tests
describe('<Unit Test>', function() {
    describe('Model Tag:', function() {

        before(function(done) {
            tag = new Tag({
                serial: 1234,
                status: 'REGISTERED',
                vTag: '9E 45 02 20 00 01 04 E0',
                type: 'Clear Triangle Tag',
                registered: false
            });

            tagDuplicatevTag = new Tag({
                serial: 1235,
                status: 'REGISTERED',
                vTag: '9E 45 02 20 00 01 04 E0',
                type: 'Clear Triangle Tag',
                registered: false
            });

            tagDuplicateSerial = new Tag({
                serial: 1234,
                status: 'REGISTERED',
                vTag: '8E 34 01 10 00 00 03 E1',
                type: 'Clear Triangle Tag',
                registered: false
            });

            done();
        });

        describe('Method Save', function() {

            it('should begin with no tags', function(done) {
                Tag.find({}, function(err, tags) {
                    tags.should.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function(done) {
                tag.save(done);
            });

            it('should fail to save a duplicate vTag tag again', function(done) {
                tag.save();
                return tagDuplicatevTag.save(function(err) {
                    should.exist(err);
                    err.errors.vTag.message.should.equal('vTag already exists');
                    done();
                });
            });

            it('should fail to save a duplicate Serial tag again', function(done) {
                tag.save();
                return tagDuplicateSerial.save(function(err) {
                    should.exist(err);
                    err.errors.serial.message.should.equal('Serial Number already exists');
                    done();
                });
            });
            
        });

        after(function(done) {
            tag.remove();
            done();
        });

    });
});