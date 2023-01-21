import { Check } from "phosphor-react";
import React from "react";

function HabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="habit" className="font-semibold leading-tight">
        Add a new habit
      </label>
      <input
        type="text"
        id="title"
        placeholder="Exercise, sleep well, drink water..."
        className="p-4 rounded-lg mt-3 bg-stone-100 placeholder:text-stone-400"
        autoFocus
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Tracking frequency
      </label>
      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-brand-800 hover:bg-brand-600 text-stone-100"
      >
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  );
}

export default HabitForm;
