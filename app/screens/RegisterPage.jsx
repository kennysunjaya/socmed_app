import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import { CREATE_USER } from "../mutations";
import LoadingScreen from "./LoadingScreen";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const [doSignUp, { error, loading, data }] = useMutation(CREATE_USER, {
    onCompleted: (res) => {
      navigation.navigate("Login");
    },
  });

  const onSignUpPress = async () => {
    await doSignUp({
      variables: {
        body: {
          email,
          name,
          password,
          username,
        },
      },
    });
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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Image style={styles.logo} source={require("../assets/lockedin-logo.jpg")} />

      <Text style={styles.headerText}>Make the most of your professional life</Text>

      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#aaa" value={name} onChangeText={setName} />

      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#aaa" value={username} onChangeText={setUsername} />

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} />

      <TextInput style={styles.input} placeholder="Password (6 or more characters)" placeholderTextColor="#aaa" secureTextEntry={true} value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.primaryButton} onPress={onSignUpPress}>
        <Text style={styles.buttonText}>Agree & Join</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already on LockedIn?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.footerLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    minWidth: 64,
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  primaryButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0073b1",
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
  footer: {
    flexDirection: "row",
    marginTop: 10,
  },
  footerText: {
    color: "#333",
    fontSize: 14,
  },
  footerLink: {
    color: "#0073b1",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    textDecorationLine: "underline",
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

export default RegisterPage;
