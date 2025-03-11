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


// try
// {
//     await main();
//     const house = 
//     {
//         address: '123 Main St',
//         city: 'Springfield',
//         state: 'IL',
//         zip: '62701',
//         rent: 1000
//     };
//     await collection.insertOne(house);
//     console.log('Inserted house:', house);
//     const houses = await collection.find({}).toArray();
//     console.log('Found houses:', houses);
//     process.exit(0);
// } catch (err) {
//     console.error('Error inserting house:', err);
// }