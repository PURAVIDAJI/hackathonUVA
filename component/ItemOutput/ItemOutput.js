import { FlatList, View } from "react-native";
import ItemList from "./ItemList";

const DUMMY_ITEMS = [
  {
    id: "e1",
    title: "Item name",
    price: "$300",
    description: "It is good",
    likes: "2",
    chat: "1",
    image: require("../../assets/img/1.jpg"),
    category: "funiture",
    user: "Inji",
    date: new Date("2024-09-11"),
    myFav: false,
  },
  {
    id: "e2",
    title: "Item name",
    price: "$300",
    description: "It is good",
    likes: "8",
    chat: "3",
    image: require("../../assets/img/2.jpg"),
    category: "funiture",
    user: "peggy",
    date: new Date("2024-10-03"),
    myFav: false,
  },
  {
    id: "e3",
    title: "Item name",
    price: "$300",
    description: "It is good",
    likes: "19",
    chat: "5",
    image: require("../../assets/img/3.jpg"),
    category: "funiture",
    user: "Dakota",
    date: new Date("2024-07-18"),
    myFav: true,
  },
  {
    id: "e4",
    title: "Item name",
    price: "$300",
    description: "It is good",
    likes: "7",
    chat: "1",
    image: require("../../assets/img/4.jpg"),
    category: "funiture",
    user: "David",
    date: new Date("2024-08-11"),
    myFav: true,
  },
  {
    id: "e5",
    title: "Item name",
    price: "$300",
    description: "It is good",
    likes: "32",
    chat: "14",
    image: require("../../assets/img/5.jpg"),
    category: "clothes",
    user: "Daniel",
    date: new Date("2024-09-07"),
    myFav: true,
  },
];

function ItemOutput({ items }) {
  return (
    <View>
      <ItemList items={DUMMY_ITEMS} />
    </View>
  );
}
export default ItemOutput;
