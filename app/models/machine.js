/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Machine Schema
 */
var MachineSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    name: { type: String, default: '', trim: true },
    aggragateContext: { type: String, trim: true },
    model: { type: String, default: '' },
    status: { type: String, default: 'PRODUCTION' },
    location: {
        timezone: { type: String, default: 'America/Boise' },
        lat: { type: Number },
        long: { type: Number },
        street: { type: String, default: '', trim: true },
        city: { type: String, default: '', trim: true },
        state: { type: String, default: '', trim: true },
        zip: { type: Number },
        description: { type: String, trim: true }
    }
});

/**
 * Validations
 */
 MachineSchema.path('aggragateContext').validate(function(aggragateContext, fn) {
    // Check only when it is a new Machine or when aggragateContext field is modified
    if (this.isNew || this.isModified('aggragateContext')) {
        var Machine = mongoose.model('Machine');
        Machine.find({
            aggragateContext: aggragateContext
        }).exec(function(err, tags) {
            fn(!err && tags.length === 0);
        });
    }
    
    else fn(true);
}, 'Aggragate Context already exists');

MachineSchema.path('name').validate(function(name, fn) {
    // Check only when it is a new Machine or when name field is modified
    if (this.isNew || this.isModified('name')) {
        var Machine = mongoose.model('Machine');
        Machine.find({
            name: name
        }).exec(function(err, tags) {
            fn(!err && tags.length === 0);
        });
    }
    
    else fn(true);
}, 'Machine Name already exists');

MachineSchema.path('name').validate(function(name) {
    return name.length;
}, 'Machine name cannot be blank');

MachineSchema.path('aggragateContext').validate(function(aggragateContext) {
    return aggragateContext.length;
}, 'Machine Aggragate Context cannot be blank');




/**
 * Statics
 */
MachineSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        })
        .populate('user')
        .exec(cb);
    }
};

/**
 * Methods
 */
MachineSchema.methods = {

};

mongoose.model('Machine', MachineSchema);