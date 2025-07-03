import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

interface Slot {
  id?: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface SlotListProps {
  slots: Slot[];
}

const SlotList: React.FC<SlotListProps> = ({ slots }) => {
  const normalizedSlots = Array.isArray(slots) ? slots : [slots];
  const renderItem = ({ item, index }: { item: Slot; index: number }) => (
    <View style={styles.slotContainer}>
      <Text style={styles.slotText}>
        {`${item.startDate} ${item.startTime}`}
      </Text>
      <Text style={styles.slotText}>{`${item.endDate} ${item.endTime}`}</Text>
    </View>
  );

  return (
    <FlatList
      data={normalizedSlots}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        item.id ? item.id : `${item.startTime}-${item.endTime}-${index}`
      }
      contentContainerStyle={[styles.listContainer, { paddingBottom: 80 }]}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", color: "#888" }}>
          No slots available.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  slotContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  slotText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SlotList;
