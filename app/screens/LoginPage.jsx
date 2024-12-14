import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useState } from "react";
import { DO_LOGIN } from "../mutations";
import { useMutation } from "@apollo/client";
import LoadingScreen from "./LoadingScreen";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [doLogin, { data, loading, error }] = useMutation(DO_LOGIN, {
    onCompleted: async (res) => {
      let token = null;
      let id = "";

      if (res?.userLogin?.data?.token) {
        token = res.userLogin.data.token;
      }
      if (res?.userLogin?.data?.id) {
        id = res.userLogin.data.id;
      }

      await SecureStore.setItemAsync("token", token);
      // await SecureStore.setItemAsync("id", id);
      setIsLoggedIn(true);
    },
  });
  const navigation = useNavigation();

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

  const onSignInPress = async () => {
    await doLogin({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Image style={styles.logo} source={require("../assets/lockedin-logo.jpg")} />
      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.input} placeholder="Username..." placeholderTextColor="#aaa" value={username} onChangeText={setUsername} />

      <TextInput style={styles.input} placeholder="Password..." placeholderTextColor="#aaa" secureTextEntry={true} value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0073b1", // LinkedOut blue
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    color: "#0073b1",
    textDecorationLine: "underline",
    marginTop: 10,
    fontSize: 16,
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

export default LoginPage;
