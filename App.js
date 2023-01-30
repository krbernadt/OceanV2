import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AnimatedSplash from "react-native-animated-splash-screen";

import QrScanner from "./screen/QrScanner";
import LoginScreen from "./screen/LoginScreen";
import HomeScreen from "./screen/HomeScreen";
import ProfileMenu from "./screen/ProfileMenu";

import ScannerMenu from "./screen/ScannerMenu";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LandingPage" component={AuthenticatedStack} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={{}}
      activeColor="#3e2465"
      shifting="true"
      inactiveColor="#D9D3EB"
      barStyle={{
        height: "10%",
        paddingTop: "2%",
        backgroundColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        shifting={true}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="QR-Menu"
        component={MenuStack}
        shifting={true}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileMenu}
        shifting={true}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#9cf2ff" },
      }}
    >
      <Stack.Screen name="QR-Scanner" component={ScannerMenu} />
      <Stack.Screen
        name="Attendance"
        component={QrScanner}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer style={styles.rootScreen}>
      <StatusBar style="dark" />
      <AuthStack />
    </NavigationContainer>
  );
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1800);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={require("./assets/pics.png")}
      backgroundColor={"#0001c0"}
      logoHeight={600}
      logoWidth={300}
    >
      <Navigation />
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: "white",
  },
});
