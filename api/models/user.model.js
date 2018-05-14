const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('user', User)