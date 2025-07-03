import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { validateInputs } from "../utils/validation";
import TimeZoneDropdown from "../components/TimeZoneDropdown";

const SlotForm = ({ onGenerateSlots }) => {
  const DEFAULT_TIME_ZONE = "America/New_York";

  const [formValues, setFormValues] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeZone: DEFAULT_TIME_ZONE,
    breakDuration: 0,
    slotDuration: 0,
    bufferDuration: 0,
  });
  const [selectedTimeZone, setSelectedTimeZone] = useState(formValues.timeZone);

  type SlotFormErrors = {
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    timeZone?: string;
    breakDuration?: string;
    slotDuration?: string;
    bufferDuration?: string;
  };

  const [errors, setErrors] = useState<SlotFormErrors>({});

  const handleTimeZoneChange = (zone: string) => {
    setSelectedTimeZone(zone);
    setFormValues({ ...formValues, timeZone: zone });
  };

  const handleSubmit = () => {
    const validationResult = validateInputs(formValues);

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    setErrors({});
    onGenerateSlots(formValues);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Start Date (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          value={formValues.startDate}
          onChangeText={(value) =>
            setFormValues({ ...formValues, startDate: value })
          }
        />
        {errors.startDate && (
          <Text style={styles.error}>{errors.startDate}</Text>
        )}

        <Text style={styles.label}>End Date (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          value={formValues.endDate}
          onChangeText={(value) =>
            setFormValues({ ...formValues, endDate: value })
          }
        />
        {errors.endDate && <Text style={styles.error}>{errors.endDate}</Text>}

        <Text style={styles.label}>Start Time (HH:mm):</Text>
        <TextInput
          style={styles.input}
          value={formValues.startTime}
          onChangeText={(value) =>
            setFormValues({ ...formValues, startTime: value })
          }
        />
        {errors.startTime && (
          <Text style={styles.error}>{errors.startTime}</Text>
        )}

        <Text style={styles.label}>End Time (HH:mm):</Text>
        <TextInput
          style={styles.input}
          value={formValues.endTime}
          onChangeText={(value) =>
            setFormValues({ ...formValues, endTime: value })
          }
        />
        {errors.endTime && <Text style={styles.error}>{errors.endTime}</Text>}

        <Text style={styles.label}>Time Zone:</Text>
        <TimeZoneDropdown
          selectedTimeZone={selectedTimeZone}
          onTimeZoneChange={handleTimeZoneChange}
        />
        {errors.timeZone && <Text style={styles.error}>{errors.timeZone}</Text>}

        <Text style={styles.label}>Break Duration (minutes):</Text>
        <TextInput
          style={styles.input}
          value={formValues.breakDuration.toString()}
          onChangeText={(value) =>
            setFormValues({
              ...formValues,
              breakDuration: parseInt(value) || 0,
            })
          }
          keyboardType="numeric"
        />
        {errors.breakDuration && (
          <Text style={styles.error}>{errors.breakDuration}</Text>
        )}

        <Text style={styles.label}>Slot Duration (minutes):</Text>
        <TextInput
          style={styles.input}
          value={formValues.slotDuration.toString()}
          onChangeText={(value) =>
            setFormValues({
              ...formValues,
              slotDuration: parseInt(value) || 0,
            })
          }
          keyboardType="numeric"
        />
        {errors.slotDuration && (
          <Text style={styles.error}>{errors.slotDuration}</Text>
        )}

        <Text style={styles.label}>Buffer Duration (minutes):</Text>
        <TextInput
          style={styles.input}
          value={formValues.bufferDuration.toString()}
          onChangeText={(value) =>
            setFormValues({
              ...formValues,
              bufferDuration: parseInt(value) || 0,
            })
          }
          keyboardType="numeric"
        />
        {errors.bufferDuration && (
          <Text style={styles.error}>{errors.bufferDuration}</Text>
        )}

        <View style={{ marginVertical: 30 }}>
          <Button title="Generate Slots" onPress={handleSubmit} />
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
});

export default SlotForm;
