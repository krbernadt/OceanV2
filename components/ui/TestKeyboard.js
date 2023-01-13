import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";

import AuthForm from "./AuthForm";
import SubmitButton from "../ui/SubmitButton";
import TitleText from "../ui/TitleText";
import { useNavigation } from "@react-navigation/native";

export default function AuthContent(isLogin, onAuthenticate) {
  const navigation = useNavigation();

  function submitHandler(credentials) {
    let { nik, password } = credentials;

    nik = nik.trim();
    password = password.trim();

    const nikIsValid = nik.length < 6;
    const passwordIsValid = password.length > 6;

    if (!nikIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        nik: !nikIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ nik, password });
  }

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    nik: false,
    password: false,
  });
  const [fontsLoaded] = useFonts({
    "hoca-bold": require("../../assets/fonts/hoca-bold.ttf"),
    "exo-2": require("../../assets/fonts/exo2-normal.ttf"),
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
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rootContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.logoImage}
                source={require("../../assets/images/logo.png")}
              />
            </View>
            <View style={styles.rightSub}>
              <Text style={styles.headerText}>CITRA TUBINDO TBK</Text>
            </View>
          </View>
          <View style={styles.contentContainer} onLayout={onLayoutRootView}>
            <ScrollView>
              <View style={styles.titleContainer}>
                <TitleText>{"OCEAN"}</TitleText>
              </View>
              <View style={styles.titleContent}>
                <Text style={styles.textContent1}>Proceed with your</Text>
                <Text style={styles.textContent2}>LOGIN</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.username}>
                  <Text style={styles.usernameTitle}>NIK</Text>
                  <View style={styles.inputField}>
                    <TextInput placeholder="NIK" />
                  </View>
                </View>
                <View style={styles.password}>
                  <Text style={styles.passwordTitle}>Password</Text>
                  <View style={styles.inputField}>
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={true}
                      autoCapitalize={false}
                      onChangeText={onUpdateValue}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <SubmitButton />
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  rootContainer: {
    flex: 1,
    marginTop: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "exo-2",
    color: "#0001C0",
  },
  contentContainer: {
    flex: 1,
    paddingLeft: deviceWidth < 800 ? "10%" : "5%",
    paddingRight: deviceWidth < 800 ? "10%" : "5%",
    width: "100%",
    height: 20,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: deviceWidth < 800 ? 120 : 140,
    height: deviceWidth < 800 ? 55 : 70,
    overflow: "hidden",
    margin: "6%",
  },
  rightSub: {
    justifyContent: "center",
  },
  contentTitle: {
    flex: 1,
    borderWidth: 1,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "15%",
  },
  titleContent: {
    paddingBottom: "10%",
  },
  textContent1: {
    fontFamily: "exo-2",
    fontSize: 20,
    fontWeight: "bold",
  },
  textContent2: {
    fontFamily: "exo-2",
    fontSize: 35,
    fontWeight: "bold",
  },
  inputField: {
    padding: "4%",
    borderWidth: 2,
    borderColor: "#0001c0",
  },
  username: {
    paddingBottom: "6%",
  },
  usernameTitle: {
    paddingBottom: "2%",
  },
  password: {},
  passwordTitle: {
    paddingBottom: "3%",
  },
  inputContainer: {
    padding: 0,
  },
  buttonContainer: {
    paddingTop: "10%",
  },
  submitButton: {
    borderRadius: 5,
  },
});
