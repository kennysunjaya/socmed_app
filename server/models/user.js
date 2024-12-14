import { ObjectId } from "mongodb";
import { db } from "../config/mongodb.js";

class User {
  static getCollection() {
    const collection = db.collection("users");
    return collection;
  }

  static async create(body) {
    const collection = this.getCollection();
    await collection.insertOne(body);

    return {
      message: "Success created user",
    };
  }

  static async findAll() {
    const collection = this.getCollection();
    const users = await collection.find().toArray();

    return users;
  }

  static async getUserByUsername(username) {
    const collection = this.getCollection();
    const result = collection.findOne({ username });

    return result;
  }

  static async search(username) {
    const collection = this.getCollection();

    const query = {
      username: { $regex: username, $options: "i" },
    };

    const users = await collection.find(query).toArray();
    return users;
  }

  static async findById(id) {
    const collection = this.getCollection();

    const _id = new ObjectId(id);

    const user = await collection
      .aggregate([
        {
          $match: {
            _id,
          },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followingId",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "followers.followerId",
            foreignField: "_id",
            as: "followerDetails",
          },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followerId",
            as: "following",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following.followingId",
            foreignField: "_id",
            as: "followingDetails",
          },
        },
      ])
      .toArray();

    return user[0];
  }
}

export default User;
