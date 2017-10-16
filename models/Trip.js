//Author: Harold & nate
const
    mongoose = require('mongoose'),
    tripSchema = new mongoose.Schema({
        start: {type: String, required: true},
        end: {type: String, required: true},
        //settings
        //method: "call" or "text"
        method: {type: String, default: "text", required: true},
        //timing: "distance" or "timeTo"
        timing: {type: String, default: "timeTo", required: true}
    })

module.exports = mongoose.model('Trip', tripSchema)