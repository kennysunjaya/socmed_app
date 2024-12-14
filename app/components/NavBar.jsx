import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { LoginContext } from "../contexts/LoginContext";
import * as SecureStore from "expo-secure-store";

const NavBar = () => {
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NavBar;
