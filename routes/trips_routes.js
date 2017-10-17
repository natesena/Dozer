const
    express = require('express'),
    tripsRouter = new express.Router(),
    Trip = require('../models/Trip.js')


tripsRouter.route('/')
    .get((req, res) => {
        //need to find by user
        Trip.find({user: req.user}, (err, trips) => {
            //need to order trips by destination
            res.render('trip_selection', {trips: trips})
        })
    })
    //need to post to user
    .post((req, res) => {
        var newTrip = new Trip()
        newTrip.user = req.user
        console.log(req)
        newTrip.save((err, trip) => {
            res.json({success: true, message: "Trip Created!", trip: trip})
        })
    })
    
    //add get

tripsRouter.route('/:tripId')
    .get((req, res) => {
        res.render('trip_selection')
        Trip.findById(req.params.id, (err, trip) => {
            res.json(trip)
        })
    })
    .patch((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {

        })
    })

module.exports = tripsRouter
