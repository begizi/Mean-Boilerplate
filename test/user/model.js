/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

//Globals
var user;

//The tests
describe('<Unit Test>', function() {
    describe('Model User:', function() {
        before(function(done) {
            user = new User({
                firstName: 'First name',
                lastName: 'Last name',
                role: 'admin',
                email: 'admin@test.com',
                username: 'admin',
                password: 'password'
            });

            user2 = new User({
                firstName: 'First name',
                lastName: 'Last name',
                role: 'admin',
                email: 'admin@test.com',
                username: 'admin',
                password: 'password'
            });

            done();
        });

        describe('Method Save', function() {
            it('should begin with no users', function(done) {
                User.find({}, function(err, users) {
                    users.should.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function(done) {
                user.save(done);
            });

            it('should fail to save an existing user again', function(done) {
                user.save();
                return user2.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });


        after(function(done) {
            user.remove();
            user2.remove();
            done();
        });
    });
});