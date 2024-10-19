import { FlatList, View } from "react-native";
import ItemList from "./ItemList";
import { DUMMY_ITEMS } from "../../constants/dummyData.js";

function ItemOutput() {
  return (
    <View>
      <ItemList items={DUMMY_ITEMS} />
    </View>
  );
}
export default ItemOutput;
