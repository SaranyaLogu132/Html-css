const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

let database;

async function getDatabase(){
    const client = await MongoClient.connect('mongodb+srv://saranya:saranya@cluster0.esdgcgo.mongodb.net/?retryWrites=true&w=majority');
    database = client.db('new_db');

    if (!database) {
            console.log('Database not connected');
    }

    return database;
}

module.exports = {
    getDatabase,
    ObjectID
}