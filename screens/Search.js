import { StyleSheet, TextInput, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../component/UI/IconButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    navigation.navigate("SearchResults", { searchTerm });
  };
  return (
    <View style={styles.Asembler}>
      <View style={styles.SearchContainer}>
        <TextInput
          placeholder="search"
          style={styles.Input}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <View style={styles.ButtonDesign}>
        <IconButton name="search" color="white" onPress={handleSearch} />
      </View>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  Asembler: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  SearchContainer: {
    backgroundColor: GlobalStyles.colors.primary400,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 15,
    width: 250,
    height: 60,
    justifyContent: "center",
  },
  Input: {
    color: "white",
  },
  ButtonDesign: {
    backgroundColor: GlobalStyles.colors.primary400,
    borderLeftColor: "white",
    borderLeftWidth: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
