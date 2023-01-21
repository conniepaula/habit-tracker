import * as Progress from "@radix-ui/react-progress";

interface ProgressBarProps {
  progress: number;
}

function ProgressBar(props: ProgressBarProps) {
  return (
    <Progress.Root
      value={100}
      className="h-3 rounded-xl bg-stone-600 w-full mt-4 overflow-hidden translate-z-0"
    >
      <Progress.Indicator
        style={{
          transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
          transform: `translateX(-${100 - props.progress}%)`,
        }}
        className="h-3 rounded-xl bg-brand-300 w-full"
      />
    </Progress.Root>
  );
}

export default ProgressBar;
