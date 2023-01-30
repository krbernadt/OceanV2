import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function QrScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [name, setName] = useState();
  const [nik, setNik] = useState();
  const [dateRec, setDateRec] = useState();
  const [timeRec, setTimeRec] = useState();
  const [scanID, setScanId] = useState(0);

  useEffect(() => {
    var date = new Date().getDate(); //current date
    var month = new Date().getMonth() + 1; //current month
    var year = new Date().getFullYear(); //current year
    var hours = new Date().getHours(); //current hours
    var min = new Date().getMinutes(); //current minutes
    var sec = new Date().getSeconds(); //current seconds

    setDateRec(date + "/" + month + "/" + year);

    setTimeRec(hours + ":" + min + ":" + sec);
  });

  const [value, setValue] = useState();
  const asyncKey = "userData";
  const attKey = "attData";

  useEffect(() => {
    getData();
  }, []);

  const increeID = () => {
    setScanId(scanID + 1);
  };

  const getData = () => {
    try {
      AsyncStorage.getItem(asyncKey)
        .then(JSON.parse)
        .then((value) => {
          if (value != null) {
            setName(value.name);
            setNik(value.nik);
          }
          setValue(value);
        });
    } catch (error) {
      console.log(error);
      navigation.replace("QR-Scanner");
    }
  };

  const setData = async (inScanData) => {
    try {
      AsyncStorage.setItem(attKey, inScanData);
      alert("Data Saved");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    increeID;
    const code = data;
    const array = {
      attID: scanID,
      nik: nik,
      name: name,
      dateRec: dateRec,
      timeRec: timeRec,
      qrCode: code,
      status: "1",
    };

    const inScanData = JSON.stringify(array);
    console.log(inScanData);
    setData(inScanData);
    navigation.replace("QR-Scanner");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
