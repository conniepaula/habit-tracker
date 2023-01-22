import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import CheckboxText from "./CheckboxText";

interface DailyHabitListProps {
  date: Date;
  onInfoChange: (completed: number) => void;
}

interface HabitsInfo {
  availableHabits: Array<{ id: string; title: string; created_at: string }>;
  completedHabits: string[];
}

function DailyHabitList({ date, onInfoChange }: DailyHabitListProps) {
  const [habitInfo, setHabitInfo] = useState<HabitsInfo>();
  async function handleHabitCompletion(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);
    const isHabitCompleted = habitInfo?.completedHabits.includes(habitId);
    let completedHabits: string[] = [];
    if (isHabitCompleted) {
      completedHabits = habitInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitInfo!.completedHabits, habitId];
    }
    setHabitInfo({
      availableHabits: habitInfo!.availableHabits,
      completedHabits,
    });
    onInfoChange(completedHabits.length);
  }
  const isDateToday = dayjs(date).endOf("day").isBefore(new Date());
  const fetchData = () => {
    api
      .get("day", { params: { date: date.toISOString() } })
      .then((response) => {
        setHabitInfo(response.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mt-8 flex flex-col gap-3">
      {habitInfo?.availableHabits.map((habit) => (
        <CheckboxText
          key={habit.id}
          onChange={() => handleHabitCompletion(habit.id)}
          checked={habitInfo.completedHabits.includes(habit.id)}
          disabled={isDateToday}
          text={habit.title}
          tracker={true}
        />
      ))}

      {/*       
      <CheckboxText text="Drink 1 cup of tea" tracker={true} />
      <CheckboxText text="Exercise for 30 minutes" tracker={true} /> */}
    </div>
  );
}

export default DailyHabitList;
