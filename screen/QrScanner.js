import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QrScanner({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [nik, setNik] = useState();
  const [value, setValue] = useState();
  const [dateRec, setDateRec] = useState();
  const [timeRec, setTimeRec] = useState();
  const attKey = "userData";
  const scanStatus = route.params.paramStatus;

  useEffect(() => {
    getAttData();
  }, []);

  useEffect(() => {
    var date = moment(new Date()).format("DD-MM-YYYY");
    var time = moment(new Date()).format("hh-mm-ss");
    setDateRec(date);
    setTimeRec(time);
  });

  const getAttData = () => {
    try {
      AsyncStorage.getItem(attKey)
        .then(JSON.parse)
        .then((value) => {
          if (value != null) {
            setNik(value.nik);
          }
          setValue(value);
        });
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
    console.log(data);
    navigation.replace("Result", {
      paramAtt: data,
      paramStatus: scanStatus,
      paramNik: nik,
    });
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
