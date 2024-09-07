const User = require('../../models/User.js');
const Password = require('../../models/Password.js');

const passwordsGet = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ status: 0, message: "Token is required" });
        }
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found" });
        }
        const passwordIds = user.passwords.map(password => password._id);
        const passwords = await Password.find({ _id: { $in: passwordIds } });
        return res.status(200).json({ status: 1, passwords });
    } catch (error) {
        return res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
};

module.exports = passwordsGet;