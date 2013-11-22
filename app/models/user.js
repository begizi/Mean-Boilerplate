/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');




var schemaOptions = {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  };


/**
 * User Schema
 */
var UserSchema = new Schema({
    firstName: { type : String, trim : true, lowercase : true },
    lastName: { type : String, trim : true, lowercase : true },
    email: { type : String, trim : true, lowercase : true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: 'subscriber' },
    hashed_password: { type : String },
    salt: { type : String }
}, schemaOptions);

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});


/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('firstName').validate(function(firstName) {
    return firstName.length;
}, 'Name cannot be blank');

UserSchema.path('lastName').validate(function(lastName) {
    return lastName.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    return hashed_password.length;
}, 'Password cannot be blank');

UserSchema.path('email').validate(function(email, fn) {
    var User = mongoose.model('User');

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({
            email: email
        }).exec(function(err, users) {
            fn(!err && users.length === 0);
        });
    }
    else fn(true);
}, 'Email already exists');

UserSchema.path('email').validate(function (email) {
  // Email must be in email format... duh.
  var pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return pattern.test(email);
}, 'Oops. Looks like your mistyped your email');



/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    next();
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};

mongoose.model('User', UserSchema);