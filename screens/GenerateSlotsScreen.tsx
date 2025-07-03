import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import SlotForm from "../components/SlotForm";
import SlotList from "../components/SlotList";
import { generateSlots } from "../utils/slotGenerator";
import { validateInputs } from "../utils/validation";

const GenerateSlotsScreen = ({ navigation }) => {
  const [slots, setSlots] = useState([]);

  const handleGenerateSlots = async (inputs) => {
    console.log("handleGenerateSlots called");
    const cleanedInputs = {
      ...inputs,
      timeZone: inputs.timeZone.trim(),
    };
    console.log("cleanedInputs:", cleanedInputs);

    const validationResult = await validateInputs(cleanedInputs);
    if (!validationResult.isValid) {
      Alert.alert(
        "Validation Error",
        Object.values(validationResult.errors).join("\n")
      );
      return;
    }

    // Pass cleanedInputs directly to the next screen
    navigation.navigate("ViewSlots", {
      inputs: cleanedInputs,
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Generate Slots</Text>
      <SlotForm onGenerateSlots={handleGenerateSlots} />
    </View>
  );
};

export default GenerateSlotsScreen;
