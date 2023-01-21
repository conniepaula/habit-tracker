import dayjs from "dayjs";

export function generateDatesArray() {
  const firstDay = dayjs().startOf("year");
  const today = new Date();
  const datesArray = [];
  let compareDates = firstDay;

  while (compareDates.isBefore(today)) {
    datesArray.push(compareDates.toDate());
    compareDates = compareDates.add(1, "day");
  }
  return datesArray;
}
