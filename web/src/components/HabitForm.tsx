import clsx from "clsx";
import { Check } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import CheckboxText from "./CheckboxText";

function HabitForm() {
  const [habit, setHabit] = useState("");
  const [frequency, setFrequency] = useState<number[]>([]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function handleHabitCreation(event: FormEvent) {
    event.preventDefault();
    console.log(frequency, habit);
  }

  function handleWeekdaySelection(day: number) {
    const alreadySelected = frequency.findIndex((item) => item === day);

    if (alreadySelected >= 0) {
      const filteredFrequency = frequency.filter((item) => item !== day);
      setFrequency(filteredFrequency);
    } else {
      setFrequency([...frequency, day]);
    }
  }
  return (
    <form onSubmit={handleHabitCreation} className="w-full flex flex-col mt-6">
      <label htmlFor="habit" className="font-semibold leading-tight">
        Add a new habit
      </label>
      <input
        type="text"
        id="title"
        placeholder="Exercise, sleep well, drink water..."
        className="p-4 rounded-lg mt-3 bg-stone-100 placeholder:text-stone-400"
        autoFocus
        onChange={(event) => setHabit(event.target.value)}
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Tracking frequency
      </label>
      <div className="mt-3 flex flex-col gap-3">
        {weekdays.map((day, index) => {
          console.log();
          return (
            <CheckboxText
              key={day}
              onChange={() => handleWeekdaySelection(index)}
              text={day}
            />
          );
        })}
      </div>
      {habit == "" ? (
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger asChild>
              <button
                type="submit"
                tooltip-enable={habit == "" ? true : false}
                disabled={habit == "" ? true : false}
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-stone-400 hover:bg-stone-400 text-stone-100"
              >
                <Check size={20} weight="bold" />
                Confirm
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="p-2 bg-stone-200 rounded-lg"
                sideOffset={5}
              >
                It's mandatory to fill the habit field.
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : (
        <button
          type="submit"
          tooltip-enable={habit == "" ? true : false}
          disabled={habit == "" ? true : false}
          className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-brand-800 text-stone-100"
        >
          <Check size={20} weight="bold" />
          Confirm
        </button>
      )}
    </form>
  );
}

export default HabitForm;
