import { View, StyleSheet, Dimensions, ScrollView, Text } from "react-native";
import React, { useCallback, useEffect } from "react";

import { useFonts } from "expo-font";
import { ImageSlider } from "react-native-image-slider-banner";

import * as SplashScreen from "expo-splash-screen";

import TitleText from "../components/ui/TitleText";
import CardMenu from "../components/ui/CardMenu";
import IconButton from "../components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "hoca-bold": require("../assets/fonts/hoca-bold.ttf"),
    "exo-2": require("../assets/fonts/exo2-normal.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.headCon1}>
          <TitleText>{"OCEAN"}</TitleText>
        </View>
      </View>
      <View style={styles.imageContainer}>
        {/* <ImageSlider
          data={[
            { img: "https://www.w3schools.com/howto/img_snow_wide.jpg" },
            { img: "https://www.w3schools.com/howto/img_nature_wide.jpg" },
            { img: "https://www.w3schools.com/howto/img_mountains_wide.jpg" },
          ]}
          preview={false}
          autoPlay={false}
          autoPlayDelay={1}
          caroselImageStyle={{ height: "100%" }}
          closeIconColor="#fff"
        /> */}
        <Text>Test</Text>
      </View>
      <View style={styles.menuCard} onLayout={onLayoutRootView}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <CardMenu>{"test 1"}</CardMenu>
            <CardMenu>{"test 2"}</CardMenu>
          </View>
          <View style={styles.cardContainer}>
            <CardMenu>{"test 1"}</CardMenu>
            <CardMenu>{"test 2"}</CardMenu>
          </View>
          <View style={styles.cardContainer}>
            <CardMenu>{"test 1"}</CardMenu>
            <CardMenu>{"test 2"}</CardMenu>
          </View>
          <View style={styles.cardContainer}>
            <CardMenu>{"test 1"}</CardMenu>
            <CardMenu>{"test 2"}</CardMenu>
          </View>
          <View style={styles.cardContainer}>
            <CardMenu>{"test 1"}</CardMenu>
            <CardMenu>{"test 2"}</CardMenu>
          </View>
          <View style={styles.cardContainer2}>
            <CardMenu>{"test 1"}</CardMenu>
          </View>
        </ScrollView>
      </View>
      <View style={styles.navigationBar}></View>
    </View>
  );
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#9cf2ff",
  },
  headCon1: {
    width: "100%",
    alignItems: "center",
  },

  titleContainer: {
    width: "100%",
    marginTop: deviceHeight > 710 ? "12%" : "8%",
    marginBottom: "1%",
    flexDirection: "row",
  },
  menuImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "95%",
    height: deviceHeight < 800 ? 120 : 150,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: "5%",
  },
  menuCard: {
    paddingVertical: "5%",

    paddingHorizontal: "10%",
    height: "60%",
    overflow: "hidden",
    marginBottom: 200,
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  cardContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
