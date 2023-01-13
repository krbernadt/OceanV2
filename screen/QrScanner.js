import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const code = data;
    console.log(code);
    return code;
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

  // const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(true);
  // const [modalVisible, setModalVisible] = useState(true);
  // const [uri, setUri] = useState("https://google.com");
  // const [code, setCode] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   setModalVisible(true);
  //   setCode({ data });
  //   console.log(code);
  //   return code;
  // };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       flexDirection: "column",
  //       justifyContent: "center",
  //     }}
  //   >
  //     <BarCodeScanner
  //       onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
  //       style={StyleSheet.absoluteFillObject}
  //     />
  //     {scanned && (
  //       <Button
  //         color={"#fff"}
  //         title={"Tap to Scan Again"}
  //         onPress={() => setScanned(false)}
  //       />
  //     )}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
