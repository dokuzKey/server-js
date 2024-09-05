const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../../models/User.js');

const register = async (req, res) => {
    const { username, email, password } = req.query;
    if (!username || !email || !password) {
        return res.json({ status: 0, message: 'Please fill all fields' }).status(400);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = await bcrypt.hash(hashedPassword, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            token
        });
        await newUser.save();
        return res.status(200).json({status: 1, "token" : token });  
    } catch (error) {
        console.log(error);
        return res.json({ status: 0, message: 'Registration failed', code: error}).status(500);
    }
};

module.exports = register;