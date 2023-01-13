import React from "react";
import { StyleSheet, Button, View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ImageSlider } from "react-native-image-slider-banner";

export default function HomeScreen2({ navigation }) {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <Text
        style={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}
      >
        SILANANG APP
      </Text>
      <Text
        style={{ textAlign: "center", marginBottom: 10, fontWeight: "bold" }}
      >
        LAPAS NARKOTIKA PANGKAL PINANG
      </Text>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <ImageSlider
          data={[
            { img: "https://www.w3schools.com/howto/img_snow_wide.jpg" },
            { img: "https://www.w3schools.com/howto/img_nature_wide.jpg" },
            { img: "https://www.w3schools.com/howto/img_mountains_wide.jpg" },
          ]}
          autoPlay={false}
          autoPlayDelay={0}
          caroselImageStyle={{ height: "100%" }}
          onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
        />
      </View>

      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <View style={styles.buttonHome}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Kunjungan")}
          >
            <FontAwesome5 size={30} color={"white"} name={"home"} solid />
            <Text style={styles.textButton}>KUNJUNGAN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonHome}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Kunjungan")}
          >
            <FontAwesome5 size={30} color={"white"} name={"envelope"} solid />
            <Text style={styles.textButton}>INTEGRASI</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonHome}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Kunjungan")}
          >
            <FontAwesome5 size={30} color={"white"} name={"book"} solid />
            <Text style={styles.textButton}>PEMBINAAN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonHome}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Kunjungan")}
          >
            <FontAwesome5 size={30} color={"white"} name={"info"} solid />
            <Text style={styles.textButton}>INFORMASI</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonHome}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Kunjungan")}
          >
            <FontAwesome5 size={30} color={"white"} name={"comments"} solid />
            <Text style={styles.textButton}>PENGADUAN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonHome}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Kunjungan")}
          >
            <FontAwesome5 size={30} color={"white"} name={"bookmark"} solid />
            <Text style={styles.textButton}>BANTUAN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{ justifyContent: "center", alignItems: "center", marginTop: 5 }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Kunjungan")}>
          <Text>Copyright © {new Date().getFullYear()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#025ef2",
    padding: 2,
    height: "100%",
    borderRadius: 15,
    shadowColor: "black",
  },
  buttonHome: {
    width: 110,
    height: 100,
    margin: 8,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
  },
});
