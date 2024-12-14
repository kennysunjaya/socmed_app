import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
import { LoginProvider } from "./contexts/LoginContext";
import RootNavigator from "./components/RootNavigator";

export default function App() {
  return (
    <LoginProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </LoginProvider>
  );
}
