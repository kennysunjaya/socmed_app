import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { GET_POST_BY_ID } from "../queries";
import LoadingScreen from "./LoadingScreen";
import { ADD_COMMENT, ADD_LIKE } from "../mutations";

const PostDetailPage = ({ route }) => {
  const [content, setContent] = useState("");
  const { id } = route.params;

  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      getPostByIdId: id,
    },
  });

  const [addComment, {}] = useMutation(ADD_COMMENT, {
    variables: {
      input: {
        content,
        postId: id,
      },
    },
    refetchQueries: [
      GET_POST_BY_ID,
      {
        variables: {
          getPostByIdId: id,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [addLike, {}] = useMutation(ADD_LIKE, {
    variables: {
      postId: id,
    },
    refetchQueries: [
      GET_POST_BY_ID,
      {
        variables: {
          getPostByIdId: id,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <Text style={styles.commentUsername}>{item.username}</Text>
      <Text style={styles.commentContent}>{item.content}</Text>
    </View>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!loading && data) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <FlatList
          data={data?.getPostById?.comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderComment}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <>
              <View style={styles.postHeader}>
                <Text style={styles.author}>{data?.getPostById?.author?.username}</Text>
              </View>
              <Image source={{ uri: data?.getPostById?.imgUrl }} style={styles.postImage} resizeMode="cover" />
              <View style={styles.postContent}>
                <Text style={styles.contentText}>{data?.getPostById?.content}</Text>
                <View style={styles.tagsContainer}>
                  {data?.getPostById?.tags?.map((tag, index) => (
                    <Text key={index} style={styles.tag}>
                      #{tag}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={addLike}>
                  <Text>Like</Text>
                </TouchableOpacity>
                <Text style={styles.likeCount}>{data?.getPostById?.likes?.length} likes</Text>
              </View>
            </>
          }
        />
        <TextInput style={styles.commentInput} placeholder="Leave your thoughts here..." placeholderTextColor="#aaa" value={content} onChangeText={setContent} />
        <TouchableOpacity style={styles.addCommentButton} onPress={addComment}>
          <Text style={styles.addCommentButtonText}>Add Comment</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  postHeader: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 14,
    color: "#0073b1",
    marginRight: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  likeButton: {
    marginRight: 10,
  },
  likeText: {
    fontSize: 16,
    color: "#555",
  },
  liked: {
    color: "#0073b1",
    fontWeight: "bold",
  },
  likeCount: {
    fontSize: 16,
    color: "#555",
  },
  commentCard: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  commentContent: {
    fontSize: 14,
    color: "#555",
  },
  commentInput: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    fontSize: 14,
    color: "#333",
  },
  addCommentButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#0073b1",
    borderRadius: 5,
    alignItems: "center",
  },
  addCommentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default PostDetailPage;
