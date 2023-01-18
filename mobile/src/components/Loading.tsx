import { ActivityIndicator, Text, View } from "react-native";
import React, { Component } from "react";

export class Loading extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FEFFFA ",
        }}
      >
        <ActivityIndicator color="#6AB4AC" />
      </View>
    );
  }
}

export default Loading;
