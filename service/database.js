import { MongoClient } from 'mongodb';
import { readFile } from 'fs/promises';
const config = JSON.parse(
    await readFile(
      new URL('./dbConfig.json', import.meta.url)
    )
  );

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('data');
const users = db.collection('users');
const cryptoData = db.collection('cryptoData');
const messages = db.collection('messages');

(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
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
    return users.insertOne(user);
}

function updateUser(user)
{
    return users.updateOne({ email: user.email }, { $set: user });
}

function getCryptoData(){
    return cryptoData.find().toArray();
}

function addCryptoData(data){
    cryptoData.deleteMany({});
    return cryptoData.insertOne(data);
}

async function getMessages() {
    return await messages.find().sort({ _id: 1 }).toArray().reverse();
}

async function addMessage(message){
    await messages.insertOne(message);
    const count = await messages.countDocuments();
    if(count > 75){
        await messages.deleteOne();
    } 

}

