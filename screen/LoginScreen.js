import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";

export default function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const APIURL = `https://fadeshare.com/react/api/reactlogin`;
  const authenticate = ({ nik, password }) => {
    setIsAuthenticating(true);
    fetch(APIURL, {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nik: nik, password: password }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.loginCodes == "error") {
          alert(responseJson.details);
        } else {
          const loginArray = JSON.stringify(responseJson.details[0]);
          console.log(loginArray);
          setData(loginArray);
          navigation.replace("LandingPage");
        }
        setIsAuthenticating(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [value, setValue] = useState();
  const asyncKey = "userData";
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem(asyncKey).then((value) => {
        if (value != null) {
          navigation.replace("LandingPage");
        }
        setValue(value);
      });
    } catch (error) {
      console.log(err);
      navigation.replace("Login");
    }
  };

  const setData = async (dataJson) => {
    try {
      AsyncStorage.setItem(asyncKey, dataJson);
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent onAuthenticate={authenticate} />;
}
