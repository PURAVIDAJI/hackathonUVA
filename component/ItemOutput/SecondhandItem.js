import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
function SecondhandItem({ title, price, likes, chat, image }) {
  return (
    <Pressable>
      <View style={style.Item}>
        <View style={style.ImageContainer}>
          <Image source={image} style={style.image} resizeMode="cover" />
        </View>
        <View style={style.Text}>
          <View style={style.First}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 5 }}
            >
              {title}
            </Text>
            <Text style={{ fontSize: 15 }}>{price}</Text>
          </View>
          <View style={style.Second}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="people" size={19} />
              <Text style={{ marginLeft: 3 }}>{chat}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 5,
              }}
            >
              <MaterialIcons name="favorite-outline" size={20} />
              <Text style={{ marginLeft: 3 }}>{likes}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
export default SecondhandItem;

const style = StyleSheet.create({
  Item: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2, // 테두리 두께 설정
    borderColor: "#A5A5A5",
  },
  Text: {
    flex: 7,
    height: 110,

    justifyContent: "space-between",
  },
  First: { paddingLeft: 15 },
  Second: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  ImageContainer: {
    flex: 3,

    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 110, height: 110, borderRadius: 10 },
});
