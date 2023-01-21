import { TouchableOpacity, Dimensions } from "react-native";
import React from "react";

const WEEKDAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const MARGIN_BETWEEN_DAYS = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEKDAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export function DailyHabit() {
  return (
    <TouchableOpacity
      className="bg-stone-100 rounded-lg border-2 border-stone-200 m-1"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.6}
    />
  );
}
