import { MongoClient } from 'mongodb';
import { readFile } from 'fs/promises';
const config = JSON.parse(
    await readFile(
      new URL('./dbConfig.json', import.meta.url)
    )
  );

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('rental');
const collection = db.collection('house');

async function main() {
    try {
        await db.command({ ping: 1 });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
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