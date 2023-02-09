import { StyleSheet, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

function CardMenu({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#93d4ff" : "#c9e9ff",
        },
        styles.card,
      ]}
      onPress={onPress}
    >
      {/* <Entypo name="network" style={styles.icon} size={40} /> */}
      <Text style={styles.subText}>{children}</Text>
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
    marginBottom: 10,
    overflow: "hidden",
  },
});
