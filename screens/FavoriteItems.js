import { Text } from "react-native";
import ItemList from "../component/ItemOutput/ItemList";
import { DUMMY_ITEMS } from "../constants/dummyData";

function FavoriteItems() {
  // 过滤出 myFav 为 true 的项目
  const filteredItems = DUMMY_ITEMS.filter((item) => item.myFav === true);

  return (
    <>
      {filteredItems.length > 0 ? (
        <ItemList items={filteredItems} />
      ) : (
        <Text>No items in your wishlist.</Text> // 如果没有任何项目被加入收藏
      )}
    </>
  );
}

export default FavoriteItems;
