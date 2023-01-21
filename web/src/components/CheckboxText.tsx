import * as Checkbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { Check } from "phosphor-react";

interface CheckBoxTextProps {
  text: string;
  tracker?: boolean;
  onChange?: () => void;
}

function CheckboxText({ text, tracker = false, onChange }: CheckBoxTextProps) {
  return (
    <Checkbox.Root
      className="flex items-center gap-3 group"
      onCheckedChange={onChange}
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-stone-100 border-2 border-stone-200 group-data-[state=checked]:bg-brand-400  group-data-[state=checked]:border-brand-200">
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
