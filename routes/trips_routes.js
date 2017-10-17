const
    express = require('express'),
    tripsRouter = new express.Router(),
    _ = require('underscore')
    Trip = require('../models/Trip.js')


tripsRouter.route('/')
    .get((req, res) => {
        //need to find by user
        Trip.find({user: req.user}, (err, trips) => {
            //look through user's trips and find top 3 destinations
            var sortedTripsByDest = _.chain(trips)
                .sortBy((trip)=>{
                    return trip.end
                })
                .reverse()
            console.log(sortedTripsByDest)
            res.render('trip_selection', {trips: trips, sortedEnds: sortedTripsByDest})
        })
    })
    //need to post to user
    .post((req, res) => {
        var newTrip = new Trip()
        newTrip.user = req.user
        newTrip.save((err, trip) => {
            if(err){
                res.json(err)
            }
            //else redirect to new page showing info from latest trip in db
            else {
                console.log(newTrip)
                res.redirect(`/trips/${newTrip.id}`)
            }
        })
    })
    
    //add get

tripsRouter.route('/:tripId')
    .get((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            if(err) {
                res.json(err)
            }
            else{
                res.render('trip', {trip: trip})
            }
        })
    })
    .patch((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {

        })
    })

module.exports = tripsRouter
