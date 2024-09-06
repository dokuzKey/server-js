const bcrypt = require('bcrypt');
const User = require('../../models/User.js');

const login = async (req, res) => {
    try {
        const { username, password } = req.query;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ code: 0, message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ code: 0, message: 'Invalid password' });
        }
        res.status(200).json({ code: 1, message: 'Login successful', token: user.token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 0, message: 'Internal server error' });
    }
};

module.exports = login;