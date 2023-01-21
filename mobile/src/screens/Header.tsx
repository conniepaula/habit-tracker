import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Logo from "../assets/logo.svg";

export default function Header() {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-brand-400 rounded-lg items-center"
      >
        <Feather name="plus" color="#6AB4AC" size={20} />
        <Text className="text-stone-700 ml-3 font-semibold text-base">New</Text>
      </TouchableOpacity>
    </View>
  );
}
