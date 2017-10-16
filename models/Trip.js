const
    mongoose = require('mongoose'),
    tripSchema = new mongoose.Schema({
        start: {type: String, required: true},
        end: {type: String, required: true}
    })

module.exports = mongoose.model('Trip', tripSchema)