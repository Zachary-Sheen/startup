const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

let users = [
    { 'username': 'example', 'password': 'ewdassdawd', 'sessionID': '1234', 'favoriteCryptos': [], 'sessionCreatedAt': new Date() }
];
let messages = [{ 'username': 'admin', 'message': 'Welcome to the chatroom!' }];

app.use(express.json());
app.use(cookieParser());

const port = process.argv.length > 2 ? process.argv[2] : 3000;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log('Hashed Password:', hash);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
    }
}

function authCheck(req, res, next) {
    const sessionID = req.cookies.sessionID;
    if (sessionID) {
        const user = users.find(u => u.sessionID === sessionID);
        if (user) {
            const sessionAge = (new Date() - new Date(user.sessionCreatedAt)) / (1000 * 60 * 60); 
            if (sessionAge < 4) { 
                req.user = user;
                return next();
            } else {
                user.sessionID = null;
                res.clearCookie('sessionID');
                return res.status(401).send({ error: 'Session expired. Please log in again.' });
            }
        }
    }
    res.status(401).send({ error: 'Unauthorized' });
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const sessionID = uuid.v4();
        user.sessionID = sessionID;
        user.sessionCreatedAt = new Date();
        res.cookie('sessionID', sessionID, { httpOnly: true });
        res.send({ message: 'Login successful' });
    } else {
        res.status(401).send({ error: 'Invalid credentials' });
    }
});

app.post('/logout', authCheck, (req, res) => {
    req.user.sessionID = null;
    req.user.sessionCreatedAt = null;
    res.clearCookie('sessionID');
    res.send({ message: 'Logout successful' });
});

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    if (users.find(u => u.username === username)) {
        return res.status(400).send({ error: 'Try a different name' });
    }
    const password = await hashPassword(req.body.password);
    const sessionID = uuid.v4();
    users.push({ 'username': username, 'password': password, 'sessionID': sessionID, 'favoriteCryptos': [], 'sessionCreatedAt': new Date() });
    res.cookie('sessionID', sessionID, { httpOnly: true });
    res.send({ message: 'Signup successful' });
});

app.get('/api/messages', authCheck, (req, res) => {
    res.send({ 'messages': messages });
});

app.post('/api/messages', authCheck, (req, res) => {
    const message = req.body.message;
    const username = req.user.username;
    messages.push({ 'username': username, 'message': message });
    res.send({ 'messages': messages });
});

app.use(function (err, req, res, next) {
    res.status(500).send("Something went wrong");
});

app.use(express.static('public'));

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});