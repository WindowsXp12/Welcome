const mongo = require('mongoose')

let Schema = new mongo.Schema({
    Guild : String,
    Channel : String, 
})

module.exports = mongo.model('welcome-channel', Schema)
