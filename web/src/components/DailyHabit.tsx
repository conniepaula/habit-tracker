import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import ProgressBar from "./ProgressBar";
import dayjs from "dayjs";
import DailyHabitList from "./DailyHabitList";
import { useState } from "react";

interface HabitProps {
  date: Date;
  completed?: number;
  total?: number;
}

function DailyHabit({ date, completed = 0, total = 0 }: HabitProps) {
  const [alteredCompleted, setAlteredCompleted] = useState(completed);
  function handleInfoChange(completed: number) {
    setAlteredCompleted(completed);
  }
  const progress = total > 0 ? Math.round((alteredCompleted / total) * 100) : 0;
  const displayedDate = dayjs(date).format("DD/MM");
  const weekday = dayjs(date).format("dddd");
  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1", {
          "bg-stone-100 border-stone-200": progress === 0,
          "bg-brand-200 border-brand-100": progress > 0 && progress < 20,
          "bg-brand-300 border-brand-200": progress >= 20 && progress < 40,
          "bg-brand-400 border-brand-300": progress >= 40 && progress < 60,
          "bg-brand-600 border-brand-400": progress >= 60 && progress < 80,
          "bg-brand-700 border-brand-500": progress >= 80 && progress < 100,
          "bg-brand-900 border-brand-700": progress == 100,
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-white flex flex-col shadow-lg focus:outline-none">
          <p className="font-semibold text-stone-500">
            {weekday.toLowerCase()}
          </p>
          <p className="mt-1 font-extrabold leading-tight text-brand-600 text-3xl">
            {displayedDate}
          </p>
          <ProgressBar progress={progress} />
          <DailyHabitList onInfoChange={handleInfoChange} date={date} />
          <Popover.Arrow height={8} width={16} className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default DailyHabit;
