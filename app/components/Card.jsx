import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Card = ({ post }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate("Post-Detail", { id: post._id })}>
      <Text style={styles.username}>{post.author.username}</Text>

      <Image source={{ uri: post.imgUrl }} style={styles.postImage} resizeMode="cover" />

      <Text style={styles.content}>{post.content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    padding: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  content: {
    fontSize: 14,
    color: "#555",
    padding: 10,
  },
});

export default Card;
