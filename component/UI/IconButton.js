import { Pressable, StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function IconButton({ name, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <FontAwesome name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 25,
  },
  pressed: {
    opacity: 0.75,
  },
});
