import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Modal,
  Text,
  Alert,
} from "react-native";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { ImageSlider } from "react-native-image-slider-banner";

import * as SplashScreen from "expo-splash-screen";

import TitleText from "../components/ui/TitleText";
import CardMenu from "../components/ui/CardMenu";

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
  const [modalVisible, setModalVisible] = useState(false);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function inHandler() {
    setModalVisible(!modalVisible);
    navigation.navigate("Attendance");
  }
  function outHandler() {
    setModalVisible(!modalVisible);
    navigation.navigate("Attendance");
  }

  return (
    <View style={styles.rootContainer} onLayout={onLayoutRootView}>
      <View style={styles.titleContainer}>
        <TitleText>{"QR - Scanner"}</TitleText>
      </View>
      <View style={styles.imageContainer}></View>
      <View style={styles.menuCard}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          onLayout={onLayoutRootView}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Choose Your Attendance</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={(() => setModalVisible(!modalVisible), inHandler)}
              >
                <Text style={styles.textStyle}>IN</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={(() => setModalVisible(!modalVisible), outHandler)}
              >
                <Text style={styles.textStyle}>OUT</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonDismiss]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Dismiss</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <ScrollView>
          <View style={styles.cardContainer}>
            <CardMenu onPress={() => setModalVisible(!modalVisible)}>
              {"ATTENDANCE"}
            </CardMenu>
            <CardMenu>{"BOP"}</CardMenu>
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
  titleContainer: {
    marginTop: deviceHeight > 710 ? "12%" : "8%",
    marginBottom: "2%",
  },
  menuImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "95%",
    height: deviceHeight < 800 ? 110 : 150,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: "7%",
    marginVertical: "3%",
    marginHorizontal: "20%",
    width: 100,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonDismiss: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: "7%",
    marginTop: "10%",
    marginHorizontal: "20%",
    width: 100,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "exo-2",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "exo-2",
    fontSize: 30,
  },
});
