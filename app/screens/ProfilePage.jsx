import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { GET_USER_BY_ID } from "../queries";
import LoadingScreen from "./LoadingScreen";
import { CREATE_FOLLOW } from "../mutations";

const ProfilePage = ({ route }) => {
  const { _id } = route.params;
  const [listType, setListType] = useState("followers");

  const { error, loading, data } = useQuery(GET_USER_BY_ID, {
    variables: { getUserByIdId: _id },
  });

  const [createFollow, {}] = useMutation(CREATE_FOLLOW, {
    variables: {
      followingId: _id,
    },
    refetchQueries: [
      GET_USER_BY_ID,
      {
        variables: {
          getUserByIdId: _id,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

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

  const user = data?.getUserById;

  const handleCreateFollow = async () => {
    await createFollow();
  };

  const handleShowList = (type) => {
    setListType(type);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.username}>{item.username}</Text>
      {/* <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailButtonText}>Details</Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.stats}>
          <TouchableOpacity onPress={() => handleShowList("followers")}>
            <Text style={styles.statText}>Followers: {user.followerDetails.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShowList("following")}>
            <Text style={styles.statText}>Following: {user.followingDetails.length}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.followButton} onPress={handleCreateFollow}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={listType === "followers" ? user.followerDetails : user.followingDetails} keyExtractor={(item) => item._id} renderItem={renderItem} contentContainerStyle={styles.listContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    fontSize: 18,
    color: "#666",
    marginVertical: 5,
  },
  email: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 15,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  statText: {
    fontSize: 16,
    color: "#0073b1",
    textDecorationLine: "underline",
  },
  followButton: {
    backgroundColor: "#0073b1",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  username: {
    fontSize: 16,
    color: "#333",
  },
  detailButton: {
    backgroundColor: "#0073b1",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 14,
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

export default ProfilePage;
