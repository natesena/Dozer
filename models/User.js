const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    userSchema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        contact: {type: String, required: false},
        city: String
    })

    userSchema.methods.generateHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }
    
    userSchema.methods.validPassword = function(password){
        return bcrypt.compareSync(password, this.password)
    }

    module.exports = mongoose.model('User', userSchema)