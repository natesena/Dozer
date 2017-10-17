// const
//     express = require('express'),
//     passport = require('passport'),
//     googleRouter = express.Router()

//     app.get('/auth/google',
//     passport.authenticate('google'),
//     function(req, res){
//       // The request will be redirected to Google for authentication, so
//       // this function will not be called.
//     });
  
//   app.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function(req, res) {
//       // Successful authentication, redirect home.
//       res.redirect('/');
//     });

//     module.exports = googleRouter