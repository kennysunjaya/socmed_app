import React from "react";
import { StyleSheet, View, Image } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <Image source={require("../assets/loading.gif")} style={styles.loadingGif} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LoadingScreen;
