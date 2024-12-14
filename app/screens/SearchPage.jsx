import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { SEARCH_USER } from "../queries";
import LoadingScreen from "./LoadingScreen";
import { useNavigation } from "@react-navigation/native";

const SearchPage = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const [search, { loading, data, error }] = useLazyQuery(SEARCH_USER);

  const handleSeeDetail = (_id) => {
    navigation.navigate("Profile", { _id });
  };

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

  const users = data?.searchUsers;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchInput} placeholder="Search users..." placeholderTextColor="#aaa" value={username} onChangeText={setUsername} />
        <TouchableOpacity style={styles.searchButton}>
          <Text
            style={styles.searchButtonText}
            onPress={() => {
              search({
                variables: {
                  username,
                },
              });
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <TouchableOpacity style={styles.detailButton} onPress={() => handleSeeDetail(item._id)}>
              <Text style={styles.detailButtonText}>Detail</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.resultsContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#0073b1",
    height: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    marginTop: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  username: {
    fontSize: 16,
    color: "#333",
  },
  detailButton: {
    backgroundColor: "#0073b1",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 14,
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

export default SearchPage;
