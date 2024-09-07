const User = require('../../models/User.js');
const Password = require('../../models/Password.js');

const passwordsCreate = async (req, res) => {
    try {
        const { token, siteAdress, username, password } = req.query;
        if (!token) {
            return res.status(400).json({ status: 0, message: "Token is required" });
        }
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found" });
        }
        if (!siteAdress || !username || !password) {
            return res.status(400).json({ status: 0, message: "Fill in all the fields" });
        }
        const newPassword = new Password({
            siteAdress,
            username,
            password
        });
        await newPassword.save();
        user.passwords.push(newPassword);
        await user.save();
        return res.status(200).json({ status: 1, message: "Password created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
};

module.exports = passwordsCreate;