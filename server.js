const express = require('express');
const app = express();
require('dotenv').config();

const passwordsGet = require('./modules/passwords/fetch.js');
const passwordsCreate = require('./modules/passwords/create.js');
const notesGet = require('./modules/notes/fetch.js');
const notesCreate = require('./modules/notes/create.js');

const connectDB = require('./modules/database/connect.js');
connectDB();

app.get('/', (req, res) => {
    return res.send('Why don\'t you try calling the API endpoints?');
});

app.get('/api/fetch/:item/:userID', (req, res) => {
    if (req.params.item === 'passwords') {
        passwordsGet(req, res);
    } else if (req.params.item === 'notes') {
        notesGet(req, res);
    } else {
        return res.json({ status: 0, data: "Please call a valid API endpoint!" });
    }
});

app.post('/api/create/:item/:userID', (req, res) => {
    if (req.params.item === 'passwords') {
        passwordsCreate(req, res);
    } else if (req.params.item === 'notes') {
        notesCreate(req, res);
    } else {
        return res.json({ status: 0, data: "Please call a valid API endpoint!" });
    }
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:' + process.env.PORT);
});