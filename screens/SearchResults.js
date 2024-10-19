import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { DUMMY_ITEMS } from "../constants/dummyData";
import ItemList from "../component/ItemOutput/ItemList";

function SearchResults() {
  const route = useRoute();
  const { searchTerm } = route.params;

  //Using searchTerm to filter the data
  const filteredItems = DUMMY_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
  );
  return (
    <View>
      {filteredItems.length === 0 ? (
        <Text>No items found for "{searchTerm}</Text>
      ) : (
        <ItemList items={filteredItems} />
      )}
    </View>
  );
}
export default SearchResults;
