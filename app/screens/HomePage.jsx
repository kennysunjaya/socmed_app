import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { gql, useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require("../assets/loading.gif")} style={styles.loadingGif} />
      </View>
    );
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
      <SafeAreaView style={styles.container}>
        <View style={styles.navbarContainer}>
          <NavBar />
        </View>

        <FlatList style={styles.content} data={data.getPosts} keyExtractor={(item) => item._id} renderItem={({ item }) => <Card post={item} />} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbarContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  content: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingGif: {
    width: 100,
    height: 100,
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

export default HomePage;
