import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Portfolio from "../screens/Portfolio";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
