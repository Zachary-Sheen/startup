const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');
const path = require('path');


// let users = []; // ex : { 'username': 'example', 'password': 'ewdassdawd', 'sessionID': '1234', 'favoriteCryptos': {}, 'sessionCreatedAt': new Date(), 'authenticated': false }
// let messages = [];  // ex: { 'username': 'admin', 'message': 'Welcome to the chatroom!' }
// let cryptoData = {};

//Database stuff

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    // console.log('Cookies:', req.cookies);
    // console.log('Body:', req.body);
    next();
});

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 4000;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
    }
}

function passwordGoodEnough(password) {
    return password.length > 7 && password.match(/[0-9]/) && password.match(/[a-z]/) && password.match(/[A-Z]/);
}

async function authCheck(req, res, next) {
    const cookiesExist = req.cookies;
    if (!cookiesExist) {
        console.log("No cookies exist");
        return res.status(401).send({ error: 'Unauthorized' });
    }
    const sessionID = req.cookies.sessionID;
    if (sessionID) {
        const user = await DB.getUserBySessionID(sessionID);
        console.log(user);
        if (user) {
            const sessionAge = (new Date() - new Date(user.sessionCreatedAt)) / (1000 * 60 * 60); 
            if (sessionAge < 4) { 
                req.user = user;
                console.log("Session is less than 4 hours old");
                return next();
            } else {
                console.log("Session is more than 4 hours old");
                user.sessionID = null;
                user.authenticated = false;
                user.sessionCreatedAt = null;
                DB.updateUser(user);
                res.clearCookie('sessionID');
                return res.status(401).send({ error: 'Session expired. Please log in again.' });
            }
        }
    }
    console.log("authCheck returning unauthorized")
    res.status(401).send({ error: 'Unauthorized' });
}

function setAuthCookie(res, authToken) {
    console.log("Setting auth cookie");
    res.cookie('sessionID', authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'Strict',
    });
    console.log("Cookie set");
}

apiRouter.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await DB.getUser(username);
    console.log(user);
    console.log("Pass right? ", await bcrypt.compare(password, user.password));
    if (user && await bcrypt.compare(password, user.password)) {
        const sessionID = uuid.v4();
        user.sessionID = sessionID;
        user.sessionCreatedAt = new Date();
        user.authenticated = true;
        DB.updateUser(user);
        setAuthCookie(res, sessionID);
        console.log("Login successful")
        res.status(200).send({ message: 'Login successful' });
    } else {
        res.status(401).send({ error: 'Invalid credentials' });
    }
});

apiRouter.delete('/logout', authCheck, async (req, res) => {
    req.user.sessionID = null;
    req.user.sessionCreatedAt = null;
    req.user.authenticated = false;
    res.clearCookie('sessionID');
    await DB.updateUser(req.user);
    res.send({ message: 'Logout successful' });
});

apiRouter.post('/signup', async (req, res) => {
    console.log("signup");
    const username = req.body.username;
    const user = await DB.getUser(username);
    if (user) {
        return res.status(400).send({ error: 'Try a different name' });
    }
    const password = req.body.hashedPassword;
    const sessionID = uuid.v4();
    console.log("Adding user");
    DB.addUser({ 'username': username, 'password': password, 'sessionID': sessionID, 'favoriteCryptos': {}, 'sessionCreatedAt': new Date(), 'authenticated': true });
    console.log("User added");
    setAuthCookie(res, sessionID);
    // users.push({ 'username': username, 'password': password, 'sessionID': sessionID, 'favoriteCryptos': {}, 'sessionCreatedAt': new Date(), 'authenticated': true });
    // setAuthCookie(res, sessionID);
    // console.log(res);
    res.status(200).send({ message: 'Signup successful' });
});

apiRouter.get('/authenticated' , authCheck, (req, res) => {
    res.status(200).send({"authenticated": req.user.authenticated, "username": req.user.username})
});

apiRouter.get('/cryptoData', authCheck, async (req, res) => {
    cryptoData = await DB.getCryptoData();
    res.status(200).send({'isempty': !cryptoData.Data,'cryptoData': cryptoData });
});

apiRouter.post('/cryptoData', authCheck, async (req, res) => {
    cryptoData = {Date: new Date(), Data: req.body.cryptoData};
    await DB.addCryptoData(cryptoData);
    res.status(200).send({'cryptoData': cryptoData });
});

apiRouter.get('/messages', authCheck, async (req, res) => {
    messages = await DB.getMessages();
    res.status(200).send({ 'messages': messages });
});

apiRouter.post('/messages', authCheck, async (req, res) => {
    const message = req.body.message;
    const username = req.user.username;
    // if (messages.length >= 50) 
    // {
    //     messages.shift(); 
    // }
    const messages = await DB.addMessage({ 'username': username, 'message': message });
    // messages.push({ 'username': username, 'message': message });
    res.status(200).send({ 'messages': messages });
});

apiRouter.get('/favorites', authCheck, (req, res) => {
    // const username = req.user.username;
    // const user = users.find(u => u.username === username);
    const favoriteCryptos = req.user.favoriteCryptos;
    res.status(200).send({'favoriteCryptos': favoriteCryptos });
});

apiRouter.post('/favorites', authCheck, (req, res) => {
    // console.log(req.body);
    const favoriteCrypto = req.body.favoriteCrypto;
    const symbol = favoriteCrypto.symbol;

    if (!req.user.favoriteCryptos[symbol]) {
        req.user.favoriteCryptos[symbol] = favoriteCrypto;
    } else {
        delete req.user.favoriteCryptos[symbol];
    }
    DB.updateUser(req.user);
    res.status(200).send({ 'favoriteCryptos': req.user.favoriteCryptos });
});

apiRouter.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});

// Catch-all route to handle unmatched routes and return a JSON response
apiRouter.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});