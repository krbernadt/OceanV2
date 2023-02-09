import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import TitleText from "../components/ui/TitleText";
import CardMenu from "../components/ui/CardMenu";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "hoca-bold": require("../assets/fonts/hoca-bold.ttf"),
    "exo-2": require("../assets/fonts/exo2-normal.ttf"),
  });
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState([]);
  const [dataTitle, setDataTitle] = useState([]);

  const [name, setName] = useState();
  const [nik, setNik] = useState();
  // const [dateTime, setDateTime] = useState();
  // const [dept, setDept] = useState();
  // const [scanStatus, setScanStatus] = useState();
  const [value, setValue] = useState();
  const attKey = "userData";
  // const nik = 12345;
  const dataURL = `https://api.fadeintech.com/api/getAttLog?nik=${nik}`;

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

  const checkScanStatus = async () => {
    fetch(dataURL)
      .then((response) => response.json())
      .then((json) => {
        if (json.msgCode == "success") {
          setData(json.details);
          console.log(JSON.stringify(json.details));
          setLoading(true);
        } else {
          setLoading(false);
        }
        setDataTitle(json);
      })
      .catch((error) => {
        if (error) {
          console.log("error");
        }
      });
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
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.headCon1}>
          <TitleText>{"OCEAN"}</TitleText>
        </View>
      </View>
      {refreshing ? (
        <View style={styles.imageContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={checkScanStatus}
              />
            }
          >
            <Text
              style={{
                paddingTop: 30,
                paddingLeft: 30,
                fontWeight: "bold",
                fontFamily: "exo-2",
                fontSize: 20,
                color: "#E48112",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              error
            </Text>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={checkScanStatus}
              />
            }
          >
            <View style={{}}>
              <Text
                style={{
                  fontFamily: "exo-2",
                  paddingHorizontal: "1%",
                  fontSize: 15,
                  color: "#000",

                  maxWidth: "90%",
                }}
              >
                {"\n"}
                {name} {"\n"}
                {nik}
                {"\n"}
                Status ={" "}
                {data.last_status != null ? (
                  data.last_status == 1 ? (
                    <Text>In</Text>
                  ) : (
                    <Text>Out</Text>
                  )
                ) : (
                  <Text>Unknown</Text>
                )}
                {"\n"}
                Previous Scan = {"\n"}
                {data.last_datetime_rec != null ? (
                  data.last_datetime_rec
                ) : (
                  <Text>Unknown</Text>
                )}
              </Text>
            </View>

            <View>
              <Text></Text>
            </View>
          </ScrollView>
        </View>
      )}

      <View style={styles.menuCard} onLayout={onLayoutRootView}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <CardMenu>
              <View style={styles.cardIcon}>
                <Ionicons name="git-network" size={50} color="white" />
                <Text style={{ textAlign: "center", paddingTop: "3%" }}>
                  ATTENDANCE
                </Text>
              </View>
            </CardMenu>
            <CardMenu>
              <View style={styles.cardIcon}>
                <Ionicons
                  name="people-circle-outline"
                  size={50}
                  color="white"
                />
                <Text style={{ textAlign: "center", paddingTop: "3%" }}>
                  Hello
                </Text>
              </View>
            </CardMenu>
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
    backgroundColor: "#246EE9",
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
    paddingHorizontal: "5%",
    borderRadius: 20,
    marginBottom: "5%",
    alignItems: "center",
    justifyContent: "flex-start",
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
  cardIcon: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});
