/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore');


exports.render = function(req, res) {
	if(!req.user.isAuthenticated) {
		res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
	} else {
    	res.render('index');
    }
};