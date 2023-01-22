import clsx from "clsx";
import { Check } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import CheckboxText from "./CheckboxText";
import { api } from "../lib/axios";

function HabitForm() {
  const [title, setTitle] = useState("");
  const [habitFrequency, setHabitFrequency] = useState<number[]>([]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  async function handleHabitCreation(event: FormEvent) {
    event.preventDefault();
    if (!title || habitFrequency.length === 0) {
      return;
    }
    await api.post("habits", {
      title,
      habitFrequency,
    });
    setTitle("");
    setHabitFrequency([]);
  }

  function handleWeekdaySelection(day: number) {
    const alreadySelected = habitFrequency.findIndex((item) => item === day);

    if (alreadySelected >= 0) {
      const filteredFrequency = habitFrequency.filter((item) => item !== day);
      setHabitFrequency(filteredFrequency);
    } else {
      setHabitFrequency([...habitFrequency, day]);
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
        className="p-4 rounded-lg mt-3 bg-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
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
              checked={habitFrequency.includes(index)}
              onChange={() => handleWeekdaySelection(index)}
              text={day}
            />
          );
        })}
      </div>
      {title == "" || habitFrequency.length === 0 ? (
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger asChild>
              <button
                type="submit"
                disabled={title == "" ? true : false}
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-stone-400 text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1"
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
                {title === ""
                  ? "It's mandatory to fill the habit field."
                  : "You must choose at least one day of the week."}
                <Tooltip.Arrow
                  height={8}
                  width={16}
                  className="fill-stone-200"
                />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : (
        <button
          type="submit"
          disabled={title == "" ? true : false}
          className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-brand-800 hover:bg-brand-600 text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1 transition-colors"
        >
          <Check size={20} weight="bold" />
          Confirm
        </button>
      )}
    </form>
  );
}

export default HabitForm;
