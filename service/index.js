const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

let users = [
    { 'username' : 'example' , 'password' : 'ewdassdawd', 'sessionID' : '1234', 'favoriteCryptos' : [] }
];
let messages = [{ 'username' : 'admin', 'message' : 'Welcome to the chatroom!' }];

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

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

function authCheck(req, res, next)
{
    const sessionID = req.cookies.sessionID;
    if (sessionID )
    {
        const user = users.find(u => u.sessionID === sessionID);
        if (user)
        {
            const sessionAge = (new Date() - new Date(user.sessionCreatedAt)) / (1000 * 60 * 60); // hours
            if (sessionAge < 3)
            {
                req.user = user;
                return next();
            }
            else
            {
                user.sessionID = null;
                res.clearCookie('sessionID');
                return res.status(401).send({ error: 'Session expired' });
            }
        }
    }
    res.status(401).send({ error: 'Unauthorized' });
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user)
    {
        return res.status(400).send({ error: 'Invalid username or password' });
    }
    if(user && await bcrypt.compare(password, user.password))
    {
        const sessionID = uuid.v4();
        user.sessionID = sessionID;
        user.sessionCreatedAt = new Date();
        res.cookie('sessionID', sessionID);
        return res.send(200, "Login Successful");
    } else
    {
        return res.status(400).send({ error: 'Invalid username or password' });
    }
});

app.post('/logout', authCheck, (req, res) => {
    req.user.sessionID = null;
    const user = find(u => u.username === req.user.username);
    user.sessionCreatedAt = null;
    res.clearCookie('sessionID');
    res.send(200, 'Logged out');
});

app.get('/messages', (req, res) => {
    res.send(200, { 'messages' : messages });
});

app.post('/messages', (req, res) => {
    const message = req.body.message;
    const username = req.body.username;
    messages.push({ 'username' : username, 'message' : message });
    res.send(200, { 'messages' : messages });
});

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    if (users.find(u => u.username === username))
    {
        res.status(400).send({ error: 'Try a different name' });
    }
    const password = hashPassword(req.body.password);
    const sessionID = uuid.v4();
    users.push({ 'username' : username, 'password' : password, 'sessionID' : sessionID, 'favoriteCryptos' : [] });
    res.cookie('sessionID', sessionID);

});

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
