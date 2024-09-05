const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log('Connected to the database!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectDB;