import DailyHabit from "./DailyHabit";
import { generateDatesArray } from "../utils/generateDatesArray";

function FrequencyTable() {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const datesInTable = generateDatesArray();
  const minimumWeeks = 18;
  const minimumTableSize = minimumWeeks * weekdays.length;
  const fillerDates = minimumTableSize - datesInTable.length;
  return (
    <section className="w-fill flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekdays.map((day, index) => {
          return (
            <p
              key={index}
              className="text-stone-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {day}
            </p>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {datesInTable.map((date) => {
          return <DailyHabit key={date.toString()} />;
        })}

        {fillerDates > 0 &&
          Array.from({ length: fillerDates }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 bg-stone-100 border-2 border-stone-200 rounded-lg opacity-60 cursor-not-allowed"
              ></div>
            );
          })}
      </div>
    </section>
  );
}

export default FrequencyTable;
