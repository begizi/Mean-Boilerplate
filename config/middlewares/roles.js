/**
 * Module dependencies.
 */


module.exports = function(user) {
	//anonymous users can only access the home page
	//returning false stops any more rules from being
	//considered
	user.use(function (req, action) {
	  if (!req.user.isAuthenticated) return action === 'access home page';
	});

	//moderator users can access private page, but
	//they might not be the only one so we don't return
	//false if the user isn't a moderator
	user.use('can view profile', function (req) {
	  if (req.user.role === 'subscriber') {
	    return true;
	  }
	});


	//admin users can access all pages
	user.use(function (req) {
	  if (req.user.role === 'admin') {
	    return true;
	  }
	});

}