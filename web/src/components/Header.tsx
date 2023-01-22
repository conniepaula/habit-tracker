import logo from "../assets/logo.svg";
import { Plus, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import HabitForm from "./HabitForm";

function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex justify-between items-center">
      <img src={logo} alt="habits-logo-image" />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="border-2 border-brand-400 font-semibold rounded-lg px-5 py-4 flex gap-3 items-center hover:border-brand-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1"
        >
          <Plus />
          New habit
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-background/80 fixed inset-0" />
          <Dialog.Content className="absolute p-10 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 rounded-lg text-stone-400 hover:text-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1 ">
              <X size={24} aria-label="Close" />
            </Dialog.Close>
            <Dialog.Title className="text-3xl leading-tight text-stone-500 font-extrabold">
              Create Habit
            </Dialog.Title>
            <HabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}

export default Header;
