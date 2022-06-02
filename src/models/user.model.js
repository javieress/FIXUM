const mongoose = require("mongoose")

const User = mongoose.model('User',{
    user: {type: String, required: true},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    cargo: {type: String, required: true},
    admin: {type: Number, required: true},
})