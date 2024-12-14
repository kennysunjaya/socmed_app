import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CREATE_POST } from "../mutations";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { GET_POSTS } from "../queries";

const CreatePostPage = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [hashtags, setHashTags] = useState("");

  const [createPost, { error, loading, data }] = useMutation(CREATE_POST, {
    variables: {
      input: {
        content,
        imgUrl,
        tags: hashtags.split(";"),
      },
    },

    onCompleted: (res) => {
      navigation.navigate("Home");
    },

    refetchQueries: [GET_POSTS],
    awaitRefetchQueries: true,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Create a Post</Text>

          <TextInput style={styles.input} placeholder="Write your content (caption)..." placeholderTextColor="#aaa" multiline value={content} onChangeText={setContent} />

          <TextInput style={styles.input} placeholder="Enter image URL..." placeholderTextColor="#aaa" value={imgUrl} onChangeText={setImgUrl} />

          <TextInput style={styles.input} placeholder="Enter tags separated by ;" placeholderTextColor="#aaa" value={hashtags} onChangeText={setHashTags} />

          <TouchableOpacity style={styles.button} onPress={createPost}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0073b1", // Button color
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreatePostPage;
