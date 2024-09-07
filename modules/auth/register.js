const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../../models/User.js');
const Password = require('../../models/Password.js');
const Note = require('../../models/Note.js');
require('dotenv').config();

const register = async (req, res) => {
    const { username, email, password } = req.query;
    if (!username || !email || !password) {
        return res.json({ status: 0, message: 'Please fill all fields' }).status(400);
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = await bcrypt.hash(hashedPassword, 10);
        const newPassword = new Password({
            siteAdress: process.env.SITEADRESS,
            username,
            password
        });
        const newNote = new Note({
            title: 'Welcome to your notes',
            body: 'This is an example note.',
        });
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            token
        });
        await newPassword.save();
        await newNote.save();
        newUser.passwords.push(newPassword);
        newUser.notes.push(newNote);
        await newUser.save();
        return res.status(200).json({ status: 1, "token" : token });  
    } catch (error) {
        console.log(error);
        return res.json({ status: 0, message: 'Registration failed', code: error}).status(500);
    }
};

module.exports = register;