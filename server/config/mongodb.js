import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export const client = new MongoClient(uri);
export let db = null;

async function main() {
  if (!db) {
    await client.connect();
    console.log("Connected successfully to server");

    db = client.db("socmed_app");
  }
}

main().then(console.log).catch(console.error);
