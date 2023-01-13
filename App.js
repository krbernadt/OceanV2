import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import QrScanner from "./screen/QrScanner";
import LoginScreen from "./screen/LoginScreen";
import HomeScreen from "./screen/HomeScreen";
import QrScanner2 from "./screen/QrScanner2";
import HomeScreen2 from "./screen/HomeScreen2";
import AboutScreen from "./screen/PageWebview";

import ScannerMenu from "./screen/ScannerMenu";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: "#0001c0",
    background: "#fff",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

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
    </Stack.Navigator>
  );
}

// function AuthenticatedStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "white" },
//       }}
//     >
//       <Stack.Screen name="HomeScreen" component={ScannerMenu} />
//     </Stack.Navigator>
//   );
// }

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      activeColor="#3e2465"
      shifting="true"
      inactiveColor="#fff"
      barStyle={{
        height: "10%",

        paddingTop: "2%",
        backgroundColor: "#C0C0FD",
      }}
    >
      <Tab.Screen
        marginTop="10%"
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
    </Tab.Navigator>
  );
}

function HomeMenu() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#025ef2" },
        headerLeft: null,
        headerBackButtonMenuEnabled: {
          onChangeText: (event) => setSearch(event.nativeEvent.text),
        },
      }}
    >
      <Stack.Screen
        name="SILANANG APP"
        component={HomeScreen2}
        options={{
          title: "SILANANG - DASHBOARD",
        }}
      />
      <Stack.Screen
        name="Kunjungan"
        component={AboutScreen}
        options={{
          title: "KUNJUNGAN",
          headerBackVisible: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerStyle: { backgroundColor: "#C0C0FD" },
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
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer style={styles.rootScreen}>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="dark" />
      <Navigation />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: "white",
  },
});

// side code
// <NavigationContainer style={styles.rootScreen} theme={MyTheme}>
// <Tab.Navigator screenOptions={{}}>
//   <Tab.Screen
//     name="Home"
//     component={HomeScreen}
//     options={{
//       tabBarIcon: ({ color }) => (
//         <MaterialCommunityIcons name="home" color={color} size={26} />
//       ),
//     }}
//   />
//   <Tab.Screen
//     name="null"
//     component={ScannerMenu}
//     options={{
//       tabBarIcon: ({ color }) => (
//         <MaterialCommunityIcons
//           name="qrcode-scan"
//           color={color}
//           size={26}
//         />
//       ),
//     }}
//   />
//   <Tab.Screen
//     name="Profile"
//     component={LoginScreen}
//     options={{
//       tabBarLabel: "Profile",
//       tabBarIcon: ({ color }) => (
//         <MaterialCommunityIcons name="account" color={color} size={26} />
//       ),
//     }}
//   />
// </Tab.Navigator>
// </NavigationContainer>
