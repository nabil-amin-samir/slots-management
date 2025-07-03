export interface Slot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface FormInputs {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  breakDuration: number;
  slotDuration: number;
  bufferDuration: number;
}
