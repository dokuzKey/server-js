const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    siteAdress: {
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
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;