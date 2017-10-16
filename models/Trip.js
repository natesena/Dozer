//Author: Harold & Nate
const
    mongoose = require('mongoose'),
    tripSchema = new mongoose.Schema({
        start: {type: String, default: "start", required: true},
        end: {type: String, default: "end", required: true},
        //settings
        //method: "call" or "text"
        method: {type: String, default: "text", required: true},
        //timing: "distance" or "timeTo"
        timing: {type: String, default: "timeTo", required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    })

module.exports = mongoose.model('Trip', tripSchema)