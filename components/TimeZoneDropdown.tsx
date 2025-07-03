import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const timeZones = [
  { label: "America/New_York", value: "America/New_York" },
  { label: "America/Chicago", value: "America/Chicago" },
  { label: "America/Los_Angeles", value: "America/Los_Angeles" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "Europe/Berlin", value: "Europe/Berlin" },
  // Add more time zones as needed
];

const TimeZoneDropdown = ({ selectedTimeZone, onTimeZoneChange }) => {
  const [timeZone, setTimeZone] = useState(selectedTimeZone);

  const handleValueChange = (itemValue) => {
    setTimeZone(itemValue);
    onTimeZoneChange(itemValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={timeZone}
          onValueChange={handleValueChange}
          style={styles.picker}
        >
          {timeZones.map((tz) => (
            <Picker.Item key={tz.value} label={tz.label} value={tz.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default TimeZoneDropdown;
