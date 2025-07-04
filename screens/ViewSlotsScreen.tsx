import React from "react";
import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SlotList from "../components/SlotList";
import TimeZoneDropdown from "../components/TimeZoneDropdown";
import { fromZonedTime, toZonedTime, format } from "date-fns-tz";
import * as Calendar from "expo-calendar";

const ViewSlotsScreen = ({ route }) => {
  const rawSlots = route?.params?.inputs || [];
  const slots = Array.isArray(rawSlots) ? rawSlots : [rawSlots];
  const [selectedTimeZone, setSelectedTimeZone] =
    React.useState("America/New_York");

  // Convert slot times to selected time zone
  const convertedSlots = slots.map((slot) => {
    try {
      const startDateTime = `${slot.startDate}T${slot.startTime}:00`;
      const endDateTime = `${slot.endDate}T${slot.endTime}:00`;

      // Convert to UTC first, then to selected time zone
      const utcStart = fromZonedTime(
        startDateTime,
        slot.timeZone || "America/New_York"
      );
      const utcEnd = fromZonedTime(
        endDateTime,
        slot.timeZone || "America/New_York"
      );

      const zonedStart = toZonedTime(utcStart, selectedTimeZone);
      const zonedEnd = toZonedTime(utcEnd, selectedTimeZone);

      return {
        ...slot,
        startDate: format(zonedStart, "yyyy-MM-dd"),
        startTime: format(zonedStart, "HH:mm"),
        endDate: format(zonedEnd, "yyyy-MM-dd"),
        endTime: format(zonedEnd, "HH:mm"),
      };
    } catch (e) {
      return slot;
    }
  });

  const slot = convertedSlots[0]; // Only use the first slot

  const handleAddToCalendar = async () => {
    if (!slot) return;

    // Request permissions
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Calendar permission is required.");
      return;
    }

    // Get default calendar
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendar =
      calendars.find((cal) => cal.allowsModifications) || calendars[0];

    if (!defaultCalendar) {
      Alert.alert("No calendar found", "Could not find a modifiable calendar.");
      return;
    }

    // Parse start and end date/time
    const startDate = new Date(`${slot.startDate}T${slot.startTime}:00`);
    const endDate = new Date(`${slot.endDate}T${slot.endTime}:00`);

    // Create event
    try {
      await Calendar.createEventAsync(defaultCalendar.id, {
        title: "Slot Event",
        startDate,
        endDate,
        notes: "Slot generated from app",
        timeZone: selectedTimeZone,
      });
      Alert.alert("Success", "Slot added to calendar!");
    } catch (e) {
      Alert.alert("Error", "Could not add to calendar.");
    }
  };

  return (
    <View>
      <Text
        style={{
          color: "red",
          alignItems: "center",
          alignSelf: "center",
          fontSize: 20,
          marginVertical: 20,
        }}
      >
        Select Time Zone:
      </Text>
      <TimeZoneDropdown
        selectedTimeZone={selectedTimeZone}
        onTimeZoneChange={setSelectedTimeZone}
      />
      <SlotList slots={convertedSlots} />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddToCalendar}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Add Slot to Calendar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add these styles at the bottom of your file
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4F8EF7",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginHorizontal: 40,
    elevation: 2, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ViewSlotsScreen;
