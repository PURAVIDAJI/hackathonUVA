import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemOutput from "../component/ItemOutput/ItemOutput";
import { GlobalStyles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

function AllItems() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ItemOutput />
      <Pressable
        onPress={() => navigation.navigate("CreatePost")}
        style={({ pressed }) => [
          GlobalStyles.customButton,
          { backgroundColor: pressed ? "#e64b2f" : "#F84C1E" },
        ]}
      >
        <Text style={GlobalStyles.buttonText}>Post</Text>
      </Pressable>
    </View>
  );
}

export default AllItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
});
