import { ObjectId } from "mongodb";
import { db } from "../config/mongodb.js";

class Post {
  static getCollection() {
    const collection = db.collection("posts");
    return collection;
  }

  static async createPost(newPost) {
    const collection = this.getCollection();
    const result = await collection.insertOne(newPost);

    return result;
  }

  static async findAll() {
    const collection = this.getCollection();
    const result = await collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
      ])
      .toArray();

    return result;
  }

  static async findById(id) {
    const collection = this.getCollection();
    const _id = new ObjectId(id);

    const result = await collection
      .aggregate([
        {
          $match: {
            _id: _id,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
      ])
      .toArray();

    return result[0];
  }

  static async addComment(newComment, postId) {
    const collection = this.getCollection();
    const _id = new ObjectId(postId);

    const result = await collection.updateOne({ _id }, { $push: { comments: newComment } });
    return result;
  }

  static async addLike(newLike, postId) {
    const collection = this.getCollection();
    const _id = new ObjectId(postId);

    const result = await collection.updateOne({ _id }, { $push: { likes: newLike } });
    return result;
  }
}

export default Post;
