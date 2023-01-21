import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "./Header";
import { DailyHabit, DAY_SIZE } from "./DailyHabit";

import { generateDatesArray } from "../utils/generateDatesArray";

export default function Home() {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const datesInTable = generateDatesArray();
  const minimumWeeks = 13;
  const minimumTableSize = minimumWeeks * 7;
  const fillerDates = minimumTableSize - datesInTable.length;
  return (
    <View className="flex-1 bg-background px-8 pt-16 mt-4">
      <Header />
      <View className="flex-row mt-8 mb-2">
        {weekdays.map((weekday, index) => (
          <Text
            key={index}
            className="text-stone-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekday}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesInTable.map((date) => (
            <DailyHabit key={date.toISOString()} />
          ))}
          {fillerDates > 0 &&
            Array.from({ length: fillerDates }).map((_, index) => (
              <View
                key={index}
                className="bg-stone-100 rounded-lg border-2 border-stone-200 m-1 opacity-60"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
