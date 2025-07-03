import React from "react";
import { View, Text } from "react-native";
import SlotList from "../components/SlotList";
import TimeZoneDropdown from "../components/TimeZoneDropdown";
import { fromZonedTime, toZonedTime, format } from "date-fns-tz";

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
    </View>
  );
};

export default ViewSlotsScreen;
