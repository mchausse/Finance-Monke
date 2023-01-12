import * as mongoDB from "mongodb"
import * as dotenv from "dotenv"

export const collections: { users?: mongoDB.Collection,
                            transactions? : mongoDB.Collection} = {}

export async function connectToDatabase () {
    dotenv.config()

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING)

    await client.connect()

    const db: mongoDB.Db = client.db(process.env.DB_NAME)

    const usersCollection: mongoDB.Collection = db.collection(process.env.STATS_COLLECTION_NAME)
    const compteurCollection: mongoDB.Collection = db.collection(process.env.CNT_COLLECTION_NAME)

    collections.users = usersCollection
    collections.transactions = compteurCollection

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`)
    console.log(`waiting for localhost...`)
 }