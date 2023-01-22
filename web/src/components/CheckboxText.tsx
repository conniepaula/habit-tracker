import * as Checkbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { Check } from "phosphor-react";

interface CheckBoxTextProps {
  text: string;
  tracker?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

function CheckboxText({
  text,
  tracker = false,
  checked,
  disabled = false,
  onChange,
}: CheckBoxTextProps) {
  return (
    <Checkbox.Root
      className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      checked={checked}
      disabled={disabled}
      onCheckedChange={onChange}
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-stone-100 border-2 border-stone-200 group-data-[state=checked]:bg-brand-400  group-data-[state=checked]:border-brand-200 transition-colors group-focus:ring-2 group-focus:ring-brand-200 group-focus:ring-offset-1">
        <Checkbox.Indicator>
          <Check size={24} className="text-white" />
        </Checkbox.Indicator>
      </div>
      <p
        className={clsx("text-xl leading-tight", {
          "group-data-[state=checked]:line-through group-data-[state=checked]:text-stone-500 font-semibold":
            tracker === true,
        })}
      >
        {text}
      </p>
    </Checkbox.Root>
  );
}

export default CheckboxText;
