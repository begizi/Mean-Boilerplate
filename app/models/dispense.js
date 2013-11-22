/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Dispense Schema
 */
var DispenseSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
    tag: { type: Schema.ObjectId, ref: 'Tag' },
    machine: { type: Schema.ObjectId, ref: 'Machine' },
    type: { type: String, default: '' },
    volume: { type: Number, default: 0 },
    TDS: { type: Number, default: 0 },
    Oxy: { type: Number, default: 0 },
    pH: { type: Number, default: 0 },
    sourceTDS: { type: Number, default: 0 },
    timeBucket: { type: Array }
});


/**
 * Validations
 */
//Write Validations here


/**
 * Pre-save hook
 */
DispenseSchema.pre('save', function(next) {
    next();
});


/**
 * Statics
 */
DispenseSchema.statics = {
};

/**
 * Methods
 */
DispenseSchema.methods = {

};

mongoose.model('Dispense', DispenseSchema);