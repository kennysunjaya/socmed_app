import { db } from "../config/mongodb.js";

class Follow {
  static getCollection() {
    const collection = db.collection("follows");
    return collection;
  }

  static async findAll() {
    const collection = this.getCollection();
    const follows = await collection.find().toArray();

    return follows;
  }

  static async create(newFollow) {
    const collection = this.getCollection();
    const result = await collection.insertOne(newFollow);

    return result;
  }
}

export default Follow;
