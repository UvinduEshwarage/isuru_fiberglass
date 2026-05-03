import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env");
}

if (!dbName) {
  throw new Error("Please define MONGODB_DB in .env");
}

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) return db; // reuse connection

  client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);
  return db;
}