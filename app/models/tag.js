/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Tag Schema
 */
var TagSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    registeredAt: { type: Date },
    registered: { type: Boolean, default: false },
    serial: { type: Number, default: 0 },
    vTag: { type: String, default: '' },
    status: { type: String, default: 'INVENTORIED' },
    user: { type: Schema.ObjectId, ref: 'User' }
});


/**
 * Validations
 */
TagSchema.path('vTag').validate(function(vTag, fn) {
    // Check only when it is a new Tag or when vTag field is modified
    if (this.isNew || this.isModified('vTag')) {
        var Tag = mongoose.model('Tag');
        Tag.find({
            vTag: vTag
        }).exec(function(err, tags) {
            fn(!err && tags.length === 0);
        });
    }
    
    else fn(true);
}, 'vTag already exists');

TagSchema.path('serial').validate(function(serial, fn) {
    // Check only when it is a new Tag or when serial field is modified
    if (this.isNew || this.isModified('serial')) {
        var Tag = mongoose.model('Tag');

        Tag.find({
            serial: serial
        }).exec(function(err, tags) {
            fn(!err && tags.length === 0);
        });
    }
    
    else fn(true);
}, 'Serial Number already exists');




/**
 * Statics
 */
TagSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        })
        .populate('user')
        .exec(cb);
    },

    findBySerial: function(serial, cb) {
        this.findOne({
            serial: serial
        })
        .populate('user')
        .exec(cb);
    }
};

/**
 * Methods
 */
TagSchema.methods = {

};

mongoose.model('Tag', TagSchema);