const User = require('../../models/User.js');
const Note = require('../../models/Note.js');

const notesGet = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ status: 0, message: "Token is required" });
        }
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found" });
        }
        const noteIds = user.notes.map(note => note._id);
        const notes = await Note.find({ _id: { $in: noteIds } });
        return res.status(200).json({ status: 1, notes });
    } catch (error) {
        return res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
};

module.exports = notesGet;