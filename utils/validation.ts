import moment from "moment-timezone";

export const validateInputs = (inputs: {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
  breakDuration: number;
  bufferDuration: number;
  timeZone?: string;
}) => {
  const {
    startDate,
    endDate,
    startTime,
    endTime,
    slotDuration,
    breakDuration,
    bufferDuration,
    timeZone,
  } = inputs;

  const errors: { [key: string]: string } = {};

  if (!startDate) {
    errors.startDate = "Start date is required.";
  } else if (!moment(startDate, "YYYY-MM-DD", true).isValid()) {
    errors.startDate = "Start date must be in YYYY-MM-DD format.";
  }

  if (!endDate) {
    errors.endDate = "End date is required.";
  } else if (!moment(endDate, "YYYY-MM-DD", true).isValid()) {
    errors.endDate = "End date must be in YYYY-MM-DD format.";
  }

  if (
    moment(startDate, "YYYY-MM-DD", true).isValid() &&
    moment(endDate, "YYYY-MM-DD", true).isValid() &&
    moment(startDate).isAfter(moment(endDate))
  ) {
    errors.startDate = "Start date must be earlier than or equal to end date.";
  }

  if (!startTime) {
    errors.startTime = "Start time is required.";
  } else if (!moment(startTime, "HH:mm", true).isValid()) {
    errors.startTime = "Start time must be in HH:mm format.";
  }

  if (!endTime) {
    errors.endTime = "End time is required.";
  } else if (!moment(endTime, "HH:mm", true).isValid()) {
    errors.endTime = "End time must be in HH:mm format.";
  }

  if (
    moment(startTime, "HH:mm", true).isValid() &&
    moment(endTime, "HH:mm", true).isValid() &&
    moment(startTime, "HH:mm").isSameOrAfter(moment(endTime, "HH:mm"))
  ) {
    errors.startTime = "Start time must precede end time.";
  }

  if (!timeZone) {
    errors.timeZone = "Time zone is required.";
  }

  if (slotDuration <= 0 || isNaN(slotDuration)) {
    errors.slotDuration = "Slot duration must be a positive integer.";
  }
  if (breakDuration < 0 || isNaN(breakDuration)) {
    errors.breakDuration = "Break duration must be a non-negative integer.";
  }
  if (bufferDuration < 0 || isNaN(bufferDuration)) {
    errors.bufferDuration = "Buffer duration must be a non-negative integer.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
