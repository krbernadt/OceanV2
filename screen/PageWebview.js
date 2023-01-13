import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Button, View, ActivityIndicator, Text } from "react-native";

export default function AboutScreen({ navigation }) {
  const Spinner = () => (
    <View style={styles.activityContainer}>
      <Text>Loading..</Text>
      <ActivityIndicator size="large" color={"#5040ff"} />
    </View>
  );
  return (
    <View style={{ height: "100%", width: "100%", paddingTop: "6%" }}>
      <WebView
        bounces={false}
        startInLoadingState={true}
        renderLoading={Spinner}
        source={{ uri: "https://silanang.com/app/login" }}
      />
      {/* <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate("SILANANG APP")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  activityContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
});
