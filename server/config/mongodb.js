import { MongoClient } from "mongodb";

const uri = "mongodb+srv://kenn667914:YVA32Cf4Fjtz6rD7@cluster0.lfyxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
