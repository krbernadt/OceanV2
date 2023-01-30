import { StyleSheet, Text, Pressable } from "react-native";

function CardMenu({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#9cf2ff" : "#DCF6F5",
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
    marginBottom: 10,
  },
});
