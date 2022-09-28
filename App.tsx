import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { ModalProvider } from "react-native-use-modal";
import { ContextProvider } from "./src/context/store/coinBase-context";
import StackNavigator from "./src/navigators/StackNavigator";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default function App() {
  return (
    <ContextProvider>
      <ModalProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ModalProvider>
    </ContextProvider>
  );
}
