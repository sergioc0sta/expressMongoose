const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('user', User)