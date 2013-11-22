/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.redirect('/users/' + req.profile.id);
        }
        next();
    }
};

/**
 * Tag authorizations routing middleware
 */
exports.tag = {
    hasAuthorization: function(req, res, next) {
        if (req.tag.createdBy.id != req.user.id) {
            return res.redirect('/tags/' + req.tag.id);
        }
        next();
    }
};

/**
 * Client authorizations routing middleware
 */
exports.client = {
    hasAuthorization: function(req, res, next) {
        next();
    }
};
