import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GenerateSlotsScreen from "./screens/GenerateSlotsScreen";
import ViewSlotsScreen from "./screens/ViewSlotsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GenerateSlots">
        <Stack.Screen
          name="GenerateSlots"
          component={GenerateSlotsScreen}
          options={{ title: "Generate Slots" }}
        />
        <Stack.Screen
          name="ViewSlots"
          component={ViewSlotsScreen}
          options={{ title: "View Slots" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
