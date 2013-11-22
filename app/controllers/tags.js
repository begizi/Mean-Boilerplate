/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Tag = mongoose.model('Tag'),
    _ = require('underscore');


/**
 * Find tag by id
 */
exports.tag = function(req, res, next, id) {
    var User = mongoose.model('User');

    Tag.load(id, function(err, tag) {
        if (err) return next(err);
        if (!tag) return next(new Error('Failed to load tag ' + id));
        req.tag = tag;
        next();
    });
};

/**
 * Create a tag
 */
exports.create = function(req, res) {
    var tag = new Tag(req.body);

    tag.createdBy = req.user;
    tag.save();
    res.json(tag);
};

/**
 * Update a tag
 */
exports.update = function(req, res) {
    var tag = req.tag;

    tag = _.extend(tag, req.body);

    tag.save(function(err) {
        res.json(tag);
    });
};

/**
 * Delete an tag
 */
exports.destroy = function(req, res) {
    var tag = req.tag;

    tag.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(tag);
        }
    });
};

/**
 * Show an tag
 */
exports.show = function(req, res) {
    res.json(req.tag);
};

/**
 * List of Tags
 */
exports.all = function(req, res) {
    var vTag = req.param('vTag');
    var serial = req.param('serial');

    var query = {};

    if(vTag) query['vTag'] = vTag;
    if(serial) query['serial'] = serial;

    

    Tag.find(query)
    .sort('-created')
    .exec(function(err, tags) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(tags);
        }
    });
};