const
    express = require('express'),
    tripsRouter = new express.Router(),
    _ = require('underscore'),
    Trip = require('../models/Trip.js'),
    nodemailer = require('nodemailer'),
    User = require('../models/User.js')

tripsRouter.route('/')
    .get((req, res) => {
        //need to find by user
        //console.log(req)

        Trip.find({user: req.user}, (err, trips) => {
         
            //look through user's trips and find top 3 destinations
            if(err) {
                 res.json(err)
            } 
            else{
                Trip.aggregate([
                    {
                        $match: {
                            user: req.user._id
                        }
                    },
                    {
                        $group: {
                        _id: "$end", count: { $sum: 1 }
                                }
                    },
                    { 
                        $sort: { 
                        count: -1 
                                } 
                    },
                    {
                        $limit : 3
                    }

                    ])
                .exec(function(err, aggregatedTrips){
                    if(err)console.log(err)
                    console.log(aggregatedTrips)
                    res.render('trip_selection', {trips: trips, sortedEnds: aggregatedTrips})
                })
            }

  
        })
        
    })



    // send a array of three trips
    //need to post to user
    .post((req, res) => {
        console.log(req.body)
        res.render('trip', {trip: req.body.trip})
        // var newTrip = new Trip()
        // newTrip.user = req.user
        // newTrip.save((err, trip) => {
        //     if(err){
        //         res.json(err)
        //     }
        //     //else redirect to new page showing info from latest trip in db
        //     else {
        //         console.log(newTrip)
        //         res.render('trip', {trip: req.body.trip})
        //     }
        // })
    })
    
    //add get

tripsRouter.route('/:tripId')
    .get((req, res) => {
        Trip.findById(req.params.tripId, (err, trip) => {
            if(err) {
                res.json(err)
            } else {
                res.render('trip', {trip: trip})
            }
        })
    })
    .patch((req, res) => {
        Trip.findByIdAndUpdate(req.params.tripId, req.body, {new: true}, (err, trip) => {
            //not updating correctly
            console.log("req.body" + JSON.stringify(req.body))
            if(err){ return console.log(err)}
            else{
                //send back ajax
                console.log('Trip should have updated')
                res.json({success:true, message:"trip updated", trip: trip})
            }
        })
    })
tripsRouter.route('/:tripId/json')
    .get((req, res) => {
        
        Trip.findById(req.params.tripId, (err, trip) => {
            if(err) {
                res.json(err)
            }
            else{
                
                res.json(trip)
            }
        })
    })

let transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})

var currentTime = new Date(new Date().getTime()).toLocaleTimeString();
const mailOptions = {
    from: process.env.GMAIL_EMAIL, // sender address
    to: 'dlorahoes@yahoo.com', // list of receivers
    subject: `Im hungry`, // Subject line
    html: `<p>${currentTime}</p>`// plain text body
};

tripsRouter.route('/:tripId/alarm') // moved from server, created route and view for alarm
    .get((req, res) => {
        Trip.findById(req.params.tripId, (err, trip) => {
            if(err) {
                res.json(err)
            } else {
                setTimeout(function() {
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err) console.log(err)
                        else console.log(info);
                     });
                }, 5000);
                return res.render('alarm', {trip: trip})
            }
        })
    })

module.exports = tripsRouter
