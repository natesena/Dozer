const
    passport = require('passport'),
    //GoogleStrategy = require('passport-google').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')
    


// serializeUser() takes the logged in User object, create a session 
// key out of it, and store that key in a cookie
passport.serializeUser((user,done) => {
    done(null,user.id)
})

// deserializeUser() reads that cookie on the next request(s) and 
// decode that into the original user object so our app knows that 
// user is still authorized
passport.deserializeUser((id,done) => {
    User.findById(id, (err, user) => {
        done(err,user)
    })
})

// LOCAL SIGNUP
passport.use('local-signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	User.findOne({email: email}, (err, user) => {
		if(err) return done(err)
		if(user) return done(null, false, req.flash('signupMessage', 'That email is taken.'))
		var newUser = new User()
         newUser.name = req.body.name
		newUser.email = email
		newUser.password = newUser.generateHash(password)
		newUser.save((err) => {
			if(err) throw err
			return done(null, newUser, null)
		})
	})
}))

// LOCAL SIGNIN
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	User.findOne({email: email}, (err, user) => {
		if(err) return done(err)
		if(!user) return done(null, false, req.flash('loginMessage', 'No user found...'))
		if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password Dumbass.'))
		return done(null, user)
	})
}))

// Google SignIn
// passport.use(new GoogleStrategy({
//     returnURL: 'http://localhost:3000/auth/google/return',
//     realm: 'http://localhost:3000/'
//   },
//   function(identifier, done) {
//     User.findByOpenID({ openId: identifier }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

module.exports = passport