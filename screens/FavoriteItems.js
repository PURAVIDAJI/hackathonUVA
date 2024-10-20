import { Text } from "react-native";
import ItemList from "../component/ItemOutput/ItemList";
import { DUMMY_ITEMS } from "../constants/dummyData";
import ItemOutput from "../component/ItemOutput/ItemOutput";

function FavoriteItems() {
  // 过滤出 myFav 为 true 的项目
  const filteredItems = DUMMY_ITEMS.filter((item) => item.myFav === true);

  return <ItemOutput fav={1} />;
}

export default FavoriteItems;
