import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import { ImageSlider } from "react-native-image-slider-banner";

import * as SplashScreen from "expo-splash-screen";

import TitleText from "../components/ui/TitleText";
import CardMenu from "../components/ui/CardMenu";
import QrScanner from "./QrScanner";

export default function ScannerMenu({ navigation }) {
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

  function pressHandler() {
    navigation.navigate("Attendance");
  }

  return (
    <View style={styles.rootContainer} onLayout={onLayoutRootView}>
      <View style={styles.titleContainer}>
        <TitleText>{"QR - Scanner"}</TitleText>
      </View>
      <View style={styles.imageContainer}>
        <ImageSlider
          data={[
            { img: "https://www.w3schools.com/howto/img_snow_wide.jpg" },
            { img: "https://www.w3schools.com/howto/img_nature_wide.jpg" },
            { img: "https://www.w3schools.com/howto/img_mountains_wide.jpg" },
          ]}
          preview={false}
          autoPlay={true}
          autoPlayDelay={1}
          caroselImageStyle={{ height: "100%" }}
          closeIconColor="#fff"
        />
      </View>
      <View style={styles.menuCard}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <CardMenu onPress={pressHandler}>{"ATTENDANCE"}</CardMenu>
            <CardMenu onPress={pressHandler}>{"BOP"}</CardMenu>
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
    backgroundColor: "white",
  },
  titleContainer: {
    marginTop: "1%",
    marginBottom: "2%",
  },
  menuImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: deviceWidth < 800 ? 140 : 150,
    overflow: "hidden",
    flexDirection: "row",
  },
  menuCard: {
    paddingTop: 20,
    paddingHorizontal: "10%",
    height: "48%",
    overflow: "hidden",
    marginBottom: 200,
    width: "100%",
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
