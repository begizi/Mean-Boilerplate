var mongoose = require('mongoose'),
    debug = require('debug')('oauth2')
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');


module.exports = function(passport, config) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        //Populate req.user and use select method to remove sensitive data
        User.findOne({ _id: id})
        .select('-salt -hashed_password -provider')
        .populate('tag')
        .exec(function(err, user) {
            done(err, user);
        });
    });

    //Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                //toLowerCase to handle auth
                email: email.toLowerCase()
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
                return done(null, user);
            });
        }
    ));

};