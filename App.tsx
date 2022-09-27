import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { ContextProvider } from "./src/context/store/coinBase-context";
import StackNavigator from "./src/navigators/StackNavigator";

export default function App() {
  return (
    <ContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
}
