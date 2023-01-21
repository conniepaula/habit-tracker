interface HabitProps {
  completed?: number;
}

function DailyHabit(props: HabitProps) {
  return (
    <div className="w-10 h-10 bg-stone-100 border-2 border-stone-200 rounded-lg">{props.completed}</div>
  );
}

export default DailyHabit;
