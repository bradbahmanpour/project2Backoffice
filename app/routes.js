// app/routes.js

var db = require("../models");

module.exports = function(app, passport) {


	// =====================================
	// CLASSES =============================
	// =====================================
	// GET route for getting all of the Classes Information

	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/addClass', isLoggedIn, function(req, res) {
		res.render('addClass.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/classes', isLoggedIn, function(req, res) {
		res.render('classes.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	
	app.get("/api/classes/", isLoggedIn,function (req, res) {
        db.classes.findAll({})
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });


    // Get route for retrieving a single Class
    app.get("/api/classes/:id", isLoggedIn,function (req, res) {
        db.classes.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // POST route for saving a new Class
    app.post("/api/classes", function (req, res) {
        console.log("I am in Routes.js file under Post:" + req.body);
        db.classes.create({
            className: req.body.className,
            classDescription: req.body.classDescription,
            classSchedule: req.body.classSchedule,
            classPrerequisit: req.body.classPrerequisit,
            classPrice: req.body.classPrice
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // DELETE route for deleting Classes
    app.delete("/api/classes/:id", function (req, res) {
        db.classes.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // PUT route for updating Classes
    app.put("/api/classes", function (req, res) {
        db.classes.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });


	// =====================================
	// TopSpots =============================
	// =====================================
	// GET route for getting all of the topSpots Information

	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/addTopSpot', isLoggedIn, function(req, res) {
		res.render('addTopSpot.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/topSpots', isLoggedIn, function(req, res) {
		res.render('topSpots.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	
	app.get("/api/topSpots/", isLoggedIn,function (req, res) {

        db.topSpots.findAll({})
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });


    // Get route for retrieving a single topSpot
    app.get("/api/topSpots/:id", isLoggedIn,function (req, res) {
        db.topSpots.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // POST route for saving a new topSpot
    app.post("/api/topSpots", function (req, res) {
        console.log(req.body);
        db.topSpots.create({
            spot: req.body.spot,
            images: req.body.images,
			body: req.body.body,
			zip: req.body.zip
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // DELETE route for deleting a topSpot
    app.delete("/api/topSpots/:id", function (req, res) {
        db.topSpots.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // PUT route for updating a topSpot
    app.put("/api/topSpots", function (req, res) {
        db.topSpots.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });
	  

	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    
    // show the login form
	app.get('/unAuthorized', function(req, res) {
        res.render('unAuthorized.ejs'); // load the index.ejs file
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		    successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =====================================
	// Admin===============================
	// =====================================
	// show the login form
	app.get('/admin', isLoggedIn, function(req, res) {
		res.render('admin.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
};



// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/unAuthorized');
}
