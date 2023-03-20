import { View, StyleSheet, Dimensions, Text, SafeAreaView } from "react-native";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleText from "../components/ui/TitleText";
import ResultButton from "../components/ui/ResultButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";

export default function ResultScreen({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    "hoca-bold": require("../assets/fonts/hoca-bold.ttf"),
    "exo-2": require("../assets/fonts/exo2-normal.ttf"),
  });

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [dataTitle, setDataTitle] = useState([]);
  const qrData = route.params.paramAtt;
  const qrStatus = route.params.paramStatus;
  const nik = route.params.paramNik;
  const logKey = "userLog";
  const dataURL = `https://api.fadeintech.com/api/apiQR?qr_data=${qrData}&&qr_status=${qrStatus}&&nik=${nik}`;

  useEffect(() => {
    console.log(dataURL);

    fetch(dataURL)
      .then((response) => response.json())
      .then((json) => {
        if (json.msgCode == "success") {
          setData(json.details);
          const logArray = JSON.stringify(json.details);
          setLog(logArray);
          console.log(logArray);
          setLoading(true);
        } else {
          setLoading(false);
        }
        setDataTitle(json);
      })
      .catch((error) => {
        if (error) {
          alert("Network Error");
        }
      });
  }, []);

  const setLog = async (dataJson) => {
    try {
      AsyncStorage.setItem(logKey, dataJson);
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
          <TitleText>{"Attendance\nLog"}</TitleText>
        </View>

        {isLoading ? (
          <View style={styles.imageContainer}>
            <Text style={styles.subTitle}>
              {"\n"}Scan Success
              {"\n"}
              {data.emp_name} - {nik}
              {"\n"}
              {data.emp_dept}
              {"\n"}
              {data.status == 1 ? (
                <Text style={{ color: "green" }}>IN</Text>
              ) : (
                <Text style={{ color: "red" }}>OUT</Text>
              )}
              {"\n"}
              {data.status == 1 ? (
                <Text>Safety First</Text>
              ) : (
                <Text>Good Work, Have a Good Day</Text>
              )}
            </Text>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Text
              style={{
                paddingTop: 30,
                fontWeight: "bold",
                fontSize: 25,
                color: "#E48112",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {dataTitle.details}
            </Text>
          </View>
        )}
        <View style={styles.headCon2}>
          <ResultButton onPress={() => navigation.navigate("QR-Scanner")} />
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
    alignItems: "center",
  },
  titleContainer: {
    marginTop: "1%",
    marginBottom: "2%",
  },
  imageContainer: {
    paddingVertical: "2%",
    paddingHorizontal: "10%",
    height: "40%",
    overflow: "hidden",
    marginBottom: 10,
    marginTop: "10%",
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "exo-2",
    fontSize: 20,
  },
});
