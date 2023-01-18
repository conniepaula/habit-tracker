import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import Loading from "./src/components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFFFA",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#44403C",
    fontFamily: "Inter_800ExtraBold",
  },
});
