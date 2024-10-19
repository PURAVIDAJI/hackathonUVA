import { FlatList, Image, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import SecondhandItem from "./SecondhandItem";

function renderSecondItem(itemData) {
  return <SecondhandItem {...itemData.item} />;
}
function ItemList({ items }) {
  return (
    <FlatList
      data={items}
      renderItem={renderSecondItem}
      keyExtractor={(item) => item.id}
    />
  );
}
export default ItemList;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});
