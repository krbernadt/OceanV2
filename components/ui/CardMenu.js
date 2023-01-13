import { StyleSheet, Text, Pressable } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QrScanner from "../../screen/QrScanner";
const Stack = createNativeStackNavigator();

function CardMenu({ navigation, children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
        },
        styles.card,
      ]}
      onPress={onPress}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}

export default CardMenu;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 130,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0001c0",
    marginBottom: 10,
  },
});
