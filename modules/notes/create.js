const User = require('../../models/User.js');
const Note = require('../../models/Note.js');

const notesCreate = async (req, res) => {
    try {
        const { token, title, body } = req.query;
        if (!token) {
            return res.status(400).json({ status: 0, message: "Token is required" });
        }
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found" });
        }
        if (!title || !body) {
            return res.status(400).json({ status: 0, message: "Fill in all the fields" });
        }
        const note = new Note({
            title,
            body,
        });
        await note.save();
        user.notes.push(note);
        await user.save();
        return res.status(200).json({ status: 1, message: "Note created successfully" });
    } catch (error) {
        return res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
};

module.exports = notesCreate;