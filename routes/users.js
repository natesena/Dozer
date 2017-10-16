const
    express = require('express'),
    passport = require('passport'),
    userRouter = new express.Router()

userRouter.route('/login')
.get((req,res) => {
    res.render('login', {message: req.flash('loginMessage')})
})
.post(passport.authenticate('local-login', {
    
    successRedirect: '/trips',
    failureRedirect: '/login'
}))

userRouter.route('/signup')
.get((req,res) => {
    // render create account form
    res.render('signup', {message: req.flash('signupMessage')})
})
.post(passport.authenticate('local-signup', {
    successRedirect: '/trips',
    failureRedirect: '/signup'
}))

userRouter.get('/profile', isLoggedIn , (req,res) => {
    // render the user's profile (only if they are currently logged in)
    res.render('profile', {user: req.user})
    })

userRouter.get('/logout', (req,res) => {
    // destroy the session, and redirect the user back to the home page
    req.logout()
    res.redirect('/')
    })

// a method used to authorize a user BEFORE allowing them to proceed to the profile page:
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/')
    }

module.exports = userRouter