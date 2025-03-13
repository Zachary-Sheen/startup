const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('data');
const users = db.collection('users');
const cryptoData = db.collection('cryptoData');
const messages = db.collection('messages');

(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connected to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

function getUser(username) {
    return users.findOne({ username });
}

function getUserBySessionID(sessionID) {
    return users.findOne({ sessionID });
}

function addUser(user){
    const username = user.username;
    const password = user.password;
    const sessionID = user.sessionID;
    const favoriteCryptos = user.favoriteCryptos;
    const sessionCreatedAt = user.sessionCreatedAt;
    const authenticated = user.authenticated;
    return users.insertOne({ "_id" : username, username, password, sessionID, favoriteCryptos, sessionCreatedAt, authenticated });
}

function updateUser(user)
{
    const {_id, ...rest} = user;
    return users.updateOne({ "_id": user.username }, { $set: rest });
}

async function getCryptoData(){
    return cryptoData.find().toArray();
}

function addCryptoData(data){
    cryptoData.deleteMany({});
    return cryptoData.insertOne(data);
}

async function getMessages() {
    const messageList = await messages.find().toArray();
    return messageList;
}

async function addMessage(message){
    await messages.insertOne(message);
    const count = await messages.countDocuments();
    if(count > 75){
        await messages.deleteOne();
    } 
    return await getMessages();
}

module.exports = {
  getUser,
  getUserBySessionID,
  addUser,
  updateUser,
  getCryptoData,
  addCryptoData,
  getMessages,
  addMessage
};

