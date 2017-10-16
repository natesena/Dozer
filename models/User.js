const
    mongoose = require('mongoose'),


    userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        contact: String,
        city: String
    })

    module.exports = mongoose.model('User', userSchema)