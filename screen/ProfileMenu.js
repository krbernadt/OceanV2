import { View, StyleSheet, Dimensions, Text, SafeAreaView } from "react-native";
import React from "react";
import { useCallback, useEffect, useState } from "react";

import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import TitleText from "../components/ui/TitleText";
import IconButton from "../components/ui/IconButton";

export default function ProfileMenu({ navigation }) {
  const [fontsLoaded] = useFonts({
    "hoca-bold": require("../assets/fonts/hoca-bold.ttf"),
    "exo-2": require("../assets/fonts/exo2-normal.ttf"),
  });

  const [refreshing, setRefreshing] = useState(true);

  // const [qrID, setQrID] = useState();
  const [name, setName] = useState();
  const [nik, setNik] = useState();
  const [value, setValue] = useState();
  const attKey = "userData";

  useEffect(() => {
    getAttData();
  }, []);

  const getAttData = () => {
    try {
      AsyncStorage.getItem(attKey)
        .then(JSON.parse)
        .then((value) => {
          if (value != null) {
            setRefreshing(false);
            setName(value.name);
            setNik(value.nik);
          }
          setValue(value);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

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
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.secondContainer} onLayout={onLayoutRootView}>
        <View style={styles.titleContainer}>
          <TitleText>{"Profile"}</TitleText>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.subTitle}>
            <Text style={{ fontSize: 30 }}>
              Hey{"\n"}
              {name}
            </Text>
          </Text>
          <View style={styles.headCon2}>
            <IconButton onPress={signOut} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#246EE9",
    paddingTop: "10%",
  },
  secondContainer: {
    alignItems: "center",
  },
  headCon2: {
    width: "50%",
    margin: "20%",
  },
  titleContainer: {
    marginTop: "1%",
    marginBottom: "25%",
  },
  imageContainer: {
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    height: deviceHeight > 800 ? "60%" : "40%",
    overflow: "hidden",
    marginBottom: 10,
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "exo-2",
  },
});
