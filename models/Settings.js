const
    mongoose = require('mongoose')
    settingsSchema = new mongoose.Schema({
        //method: "call" or "text"
        method: {type: String, default: "text"},
        //timing: "distance" or "timeTo"
        timing: {type: String, default: "timeTo"}
    })
    module.exports = mongoose.model('Settings', settingsSchema)