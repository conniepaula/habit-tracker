import logo from "../assets/logo.svg";
import { Plus } from "phosphor-react";

function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex justify-between items-center">
      <img src={logo} alt="habits-logo-image" />
      <button
        type="button"
        className="border border-brand-400 font-semibold rounded-lg px-5 py-4 flex gap-3 items-center hover:border-brand-200 "
      >
        <Plus />
        New habit
      </button>
    </header>
  );
}

export default Header;
