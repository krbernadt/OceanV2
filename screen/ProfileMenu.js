import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { useCallback, useEffect, useState } from "react";

import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import TitleText from "../components/ui/TitleText";
import IconButton from "../components/ui/IconButton";
import { FlatList } from "react-native-gesture-handler";

export default function ScannerMenu({ navigation }) {
  const [fontsLoaded] = useFonts({
    "hoca-bold": require("../assets/fonts/hoca-bold.ttf"),
    "exo-2": require("../assets/fonts/exo2-normal.ttf"),
  });

  const [refreshing, setRefreshing] = useState(true);

  const [qrID, setQrID] = useState();
  const [name, setName] = useState();
  const [nik, setNik] = useState();
  const [dateRec, setDateRec] = useState();
  const [timeRec, setTimeRec] = useState();
  const [qrCode, setQrCode] = useState();
  const [value, setValue] = useState();
  const [status, setStatus] = useState();
  const attKey = "attData";

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
            setQrID(value.qrID);
            setName(value.name);
            setNik(value.nik);
            setDateRec(value.dateRec);
            setTimeRec(value.timeRec);
            setQrCode(value.qrCode);
            setStatus(value.status);
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

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAttData} />
        }
      >
        <View style={styles.secondContainer} onLayout={onLayoutRootView}>
          <View style={styles.titleContainer}>
            <TitleText>{"Profile"}</TitleText>
          </View>
          <View style={styles.imageContainer}>
            <Text style={styles.subTitle}>
              {"\n"}Hey there
              {"\n"}
              {name} - {nik} - {qrID}
              {"\n"}
              {dateRec} - {timeRec}
              {"\n"}
              {qrCode} - {status}
            </Text>
          </View>
          <View>
            {/* <Text>
            {"\n"}
            device height :{deviceHeight}
          </Text>
          <Text>
            {"\n"}
            device width :{deviceWidth}
          </Text> */}
            {/* <FlatList
              data={getAttData}
              renderItem={({ item }) => <Item title={item.title} />}
              keyExtractor={(item) => item.id}
            ></FlatList> */}
          </View>

          <View style={styles.headCon2}>
            <IconButton onPress={signOut} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#9cf2ff",
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
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    height: "40%",
    overflow: "hidden",
    marginBottom: 10,
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "exo-2",
    fontSize: 15,
  },
});
