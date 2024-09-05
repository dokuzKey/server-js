const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    token: {
        type: String,
        required: true
    },
    passwords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Password'
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

const User = model('User', userSchema);

module.exports = User;
