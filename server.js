const express = require('express');
const app = express();
const helmet = require('helmet');
require('dotenv').config();

app.use(express.json());
app.use(helmet());

// Item handlers
const passwordsGet = require('./modules/passwords/fetch.js');
const passwordsCreate = require('./modules/passwords/create.js');
const notesGet = require('./modules/notes/fetch.js');
const notesCreate = require('./modules/notes/create.js');

// Database handler
const connectDB = require('./modules/database/connect.js');
connectDB();

// Authentication handlers
const register = require('./modules/auth/register.js');
const login = require('./modules/auth/login.js');

app.get('/', (req, res) => {
    return res.send('Why don\'t you try calling the API endpoints?');
});

app.get('/api/fetch/:item', (req, res) => {
    if (req.params.item === 'passwords') {
        passwordsGet(req, res);
    } else if (req.params.item === 'notes') {
        notesGet(req, res);
    } else {
        return res.json({ status: 0, data: "Please call a valid API endpoint!" });
    }
});

app.post('/api/create/:item', (req, res) => {
    if (req.params.item === 'passwords') {
        passwordsCreate(req, res);
    } else if (req.params.item === 'notes') {
        notesCreate(req, res);
    } else {
        return res.json({ status: 0, data: "Please call a valid API endpoint!" });
    }
});

app.post('/api/auth/register', (req, res) => {
    register(req, res);
});

app.post('/api/auth/login', (req, res) => {
    login(req, res);
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:' + process.env.PORT);
});