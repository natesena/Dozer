const
    express = require('express'),
    tripsRouter = new express.Router(),
    Trip = require('../models/Trip.js')
    Setting = require('../models/Settings.js')


tripsRouter.route('/')
    .post((req, res) => {
        var newTrip = new Trip()
        newTrip.save((err, trip) => {
            res.json({success: true, message: "Trip Created!", trip: trip})
        })
    })

tripsRouter.route('/:tripId')
    .get((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            res.json(trip)
        })
    })
    .patch((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {

        })
    })

