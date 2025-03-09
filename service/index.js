const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

let users = []; // ex : { 'username': 'example', 'password': 'ewdassdawd', 'sessionID': '1234', 'favoriteCryptos': {}, 'sessionCreatedAt': new Date(), 'authenticated': false }
let messages = [];  // ex: { 'username': 'admin', 'message': 'Welcome to the chatroom!' }
let cryptoData = {};

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Cookies:', req.cookies);
    console.log('Body:', req.body);
    next();
});

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

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

function passwordGoodEnough(password) {
    return password.length > 7 && password.match(/[0-9]/) && password.match(/[a-z]/) && password.match(/[A-Z]/);
}

function authCheck(req, res, next) {
    // print("in middleware")
    // print(req.cookies)
    // print(req.body)
    // console.log("in middleware")
    // console.log(req.cookies, req.cookies == null)
    // console.log(req.body)
    const sessionID = req.cookies.sessionID;
    if (sessionID) {
        console.log("Session ID exists")
        const user = users.find(u => u.sessionID === sessionID);
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
                res.clearCookie('sessionID');
                return res.status(401).send({ error: 'Session expired. Please log in again.' });
            }
        }
    }
    console.log("authCheck returning unauthorized")
    res.status(401).send({ error: 'Unauthorized' });
}

apiRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const sessionID = uuid.v4();
        user.sessionID = sessionID;
        user.sessionCreatedAt = new Date();
        user.authenticated = true;
        res.cookie('sessionID', sessionID, { httpOnly: true });
        console.log("Login successful")
        res.status(200).send({ message: 'Login successful' });
    } else {
        res.status(401).send({ error: 'Invalid credentials' });
    }
});

apiRouter.delete('/logout', authCheck, (req, res) => {
    req.user.sessionID = null;
    req.user.sessionCreatedAt = null;
    req.user.authenticated = false;
    res.clearCookie('sessionID');
    res.send({ message: 'Logout successful' });
});

apiRouter.post('/signup', async (req, res) => {
    console.log("signup");
    const username = req.body.username;
    if (users.find(u => u.username === username)) {
        return res.status(400).send({ error: 'Try a different name' });
    }
    const password = req.body.hashedPassword;
    const sessionID = uuid.v4();
    users.push({ 'username': username, 'password': password, 'sessionID': sessionID, 'favoriteCryptos': {}, 'sessionCreatedAt': new Date(), 'authenticated': true });
    console.log(users)
    res.cookie('sessionID', sessionID, { httpOnly: true });
    res.status(200).send({ message: 'Signup successful' });
});

apiRouter.get('/authenticated' , authCheck, (req, res) => {
    // console.log('in authenticated, ' + req.user)
    res.status(200).send({"authenticated": req.user.authenticated, "username": req.user.username})
});

apiRouter.get('/cryptoData', authCheck, (req, res) => {
    console.log("Trying to get cryptoData: \n\n" + cryptoData)
    console.log("CryptoData length " + !cryptoData.Data)
    console.log({'isempty': !cryptoData.Data})
    res.status(200).send({'isempty': !cryptoData.Data,'cryptoData': cryptoData });
});

apiRouter.post('/cryptoData', authCheck, (req, res) => {
    cryptoData = {Date: new Date(), Data: req.body.cryptoData};
    res.status(200).send({'cryptoData': cryptoData });
});

// apiRouter.get('/users' , (req, res) => {
//     console.log('in users')
//     res.status(200).send({ 'users': users });
// });

apiRouter.get('/messages', authCheck, (req, res) => {
    res.status(200).send({ 'messages': messages });
});

apiRouter.post('/messages', authCheck, (req, res) => {
    const message = req.body.message;
    const username = req.user.username;
    if (messages.length >= 50) 
    {
        messages.shift(); 
    }
    messages.push({ 'username': username, 'message': message });
    res.status(200).send({ 'messages': messages });
});

apiRouter.get('/favorites', authCheck, (req, res) => {
    const username = req.user.username;
    const user = users.find(u => u.username === username);
    const favoriteCryptos = user.favoriteCryptos;
    res.status(200).send({'favoriteCryptos': favoriteCryptos });
});

apiRouter.post('/favorites', authCheck, (req, res) => {
    console.log(req.body);
    const favoriteCrypto = req.body.favoriteCrypto;
    const symbol = favoriteCrypto.symbol;

    if (!req.user.favoriteCryptos[symbol]) {
        req.user.favoriteCryptos[symbol] = favoriteCrypto;
    } else {
        delete req.user.favoriteCryptos[symbol];
    }
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});