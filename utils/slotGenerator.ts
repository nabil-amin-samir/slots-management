import { toZonedTime, format } from "date-fns-tz";

export interface Slot {
  start: string;
  end: string;
}

export interface GenerateSlotsParams {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  breakDuration: number;
  slotDuration: number;
  bufferDuration: number;
}

export function generateSlots(params: GenerateSlotsParams): Slot[] {
  const {
    startDate,
    endDate,
    startTime,
    endTime,
    timeZone,
    breakDuration,
    slotDuration,
    bufferDuration,
  } = params;

  const slots: Slot[] = [];
  const start = new Date(`${startDate}T${startTime}:00`);
  const end = new Date(`${endDate}T${endTime}:00`);

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    let currentSlotStart = new Date(date);
    currentSlotStart.setHours(start.getHours(), start.getMinutes(), 0, 0);

    const currentSlotEnd = new Date(date);
    currentSlotEnd.setHours(end.getHours(), end.getMinutes(), 0, 0);

    while (currentSlotStart < currentSlotEnd) {
      const slotEnd = new Date(currentSlotStart);
      slotEnd.setMinutes(currentSlotStart.getMinutes() + slotDuration);

      if (slotEnd > currentSlotEnd) break;

      slots.push({
        start: format(
          toZonedTime(currentSlotStart, timeZone),
          "yyyy-MM-dd HH:mm:ssXXX",
          { timeZone }
        ),
        end: format(toZonedTime(slotEnd, timeZone), "yyyy-MM-dd HH:mm:ssXXX", {
          timeZone,
        }),
      });

      currentSlotStart.setMinutes(
        currentSlotStart.getMinutes() + slotDuration + breakDuration
      );
    }
  }

  return slots.filter((slot) => {
    const slotStart = new Date(slot.start);
    return slotStart.getTime() > Date.now() + bufferDuration * 60000;
  });
}
