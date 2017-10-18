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
        Trip.findById(req.params.tripId, (err, trip) => {
            if(err) {
                res.json(err)
            }
            else{
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
        console.log(req.params.tripId)
        Trip.findById(req.params.tripId, (err, trip) => {
            if(err) {
                res.json(err)
            }
            else{
                res.json(trip)
            }
        })
    })

module.exports = tripsRouter
