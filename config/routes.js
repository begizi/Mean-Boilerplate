var async = require('async');

module.exports = function(app, passport, auth, user) {
    //User Routes
    var users = require('../app/controllers/users'),
        tags = require('../app/controllers/tags'),
        index = require('../app/controllers/index');



    //User Signin
    app.get('/signin', users.signin);
    //User Signup
    app.get('/signup', users.signup);
    //User Signout
    app.get('/signout', users.signout);


    //Only admin can list out all users
    app.get('/users', users.all);
    //Signup POSTs to users. Only create user if matching tag is found
    app.post('/users', users.create);
    //Logged in user API
    app.get('/users/me', users.me);
    //Only admin can read a spacific members profile
    app.get('/users/:userId', users.show);

    //Sessions Handling
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);


    //Tag Routes
    app.get('/tags', tags.all);
    app.post('/tags', tags.create);
    app.get('/tags/:tagId', tags.show);
    app.put('/tags/:tagId', tags.update);
    app.del('/tags/:tagId', tags.destroy);


    //Route Params
    app.param('tagId', tags.tag);
    app.param('userId', users.user);


    //Home route
    app.get('/', index.render);



};