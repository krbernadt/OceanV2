import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useCallback, useEffect } from "react";

import { useFonts } from "expo-font";
import { ImageSlider } from "react-native-image-slider-banner";

import * as SplashScreen from "expo-splash-screen";

import TitleText from "../components/ui/TitleText";
import CardMenu from "../components/ui/CardMenu";
import IconButton from "../components/ui/IconButton";
import { AuthContext } from "../store/auth-context";

export default function HomeScreen() {
  const authCtx = useContext(AuthContext);
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
        <View style={styles.headCon2}>
          <IconButton onPress={authCtx.logout} />
        </View>
      </View>
      {/* <View style={styles.imageContainer}>
        <Image
          style={styles.menuImage}
          source={require("../assets/images/menu-image.jpg")}
        />
      </View> */}
      <View style={styles.imageContainer}>
        <ImageSlider
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
        />
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
    backgroundColor: "white",
  },
  headCon1: {
    width: "60%",
    marginLeft: "5%",
  },
  headCon2: {
    width: "25%",
  },
  titleContainer: {
    width: "100%",
    marginTop: deviceHeight > 710 ? "12%" : "8%",
    marginBottom: "2%",
    flexDirection: "row",
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
    paddingTop: "10%",
    paddingHorizontal: "10%",
    height: "60%",
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
