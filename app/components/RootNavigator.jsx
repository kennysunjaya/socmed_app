import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";
import HomePage from "../screens/HomePage";
import ProfilePage from "../screens/ProfilePage";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import SearchPage from "../screens/SearchPage";
import CreatePostPage from "../screens/CreatePostPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text } from "react-native";
import PostDetailPage from "../screens/PostDetailPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function FooterTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          if (route.name === "Search") {
            iconSource = require("../assets/search-icon.png");
          } else if (route.name === "Home") {
            iconSource = require("../assets/home-icon.png");
          } else if (route.name === "CreatePost") {
            iconSource = require("../assets/createpost-icon.png");
          }
          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#0073b1" : "#555",
              }}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === "Search") {
            label = "Search";
          } else if (route.name === "Home") {
            label = "Home";
          } else if (route.name === "CreatePost") {
            label = "Create";
          }

          return (
            <Text
              style={{
                fontSize: 12,
                color: focused ? "#0073b1" : "#555",
              }}
            >
              {label}
            </Text>
          );
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          paddingVertical: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="CreatePost" component={CreatePostPage} />
    </Tab.Navigator>
  );
}

const RootNavigator = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="MainTabs" component={FooterTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="Post-Detail" component={PostDetailPage} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
