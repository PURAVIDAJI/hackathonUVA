import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // 导入图标库
import { AntDesign } from "@expo/vector-icons"; // 导入爱心图标

function DetailItem() {
  const route = useRoute();
  const {
    title,
    price,
    likes,
    chat,
    image,
    user,
    myFav,
    category,
    description,
  } = route.params; // 解构获取传递的参数

  const [isFavorited, setIsFavorited] = useState(myFav); // 用来控制爱心的状态

  // 点击爱心图标时触发的函数
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // 切换 myFav 状态
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.userContainer}>
        <View style={styles.avatar} />
        <Text style={styles.userName}>{user}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.underline} />
      <View style={styles.categoryContainer}>
        <MaterialIcons name="category" size={28} color="black" />
        <Text style={styles.categoryLabel}>Category: </Text>
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>

      <Text style={styles.likes}>
        Likes: {likes}, Chat: {chat}
      </Text>
      <View style={styles.bottomBar}>
        {/* 点击爱心图标的按钮 */}
        <TouchableOpacity onPress={toggleFavorite}>
          <AntDesign
            name={isFavorited ? "heart" : "hearto"} // 根据状态选择图标
            size={28}
            color={isFavorited ? "red" : "black"} // 根据状态选择颜色
            style={styles.heartIcon}
          />
        </TouchableOpacity>
        <Text style={styles.priceBottom}>{price}</Text>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Start Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    color: "gray",
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: "green",
    marginBottom: 10,
  },
  likes: {
    fontSize: 16,
  },
  chat: {
    fontSize: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "lightgray", // 头像背景色
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  underline: {
    height: 2, // 下划线的高度
    backgroundColor: "black", // 下划线的颜色
    width: "100%", // 设置宽度为 80%
    alignSelf: "center", // 居中对齐
    marginVertical: 5, // 上下留白
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  categoryLabel: {
    fontSize: 18,
    marginLeft: 5,
  },
  categoryBox: {
    backgroundColor: "#d0d0d0", // 分类框的背景色
    borderRadius: 10, // 圆角
    padding: 5,
    marginLeft: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomBar: {
    backgroundColor: "#d0d0d0", // 底部栏背景色
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 元素之间保持间距
    borderRadius: 10,
    marginTop: "auto", // 将底部栏固定在页面底部
  },
  heartIcon: {
    marginLeft: 10,
  },
  priceBottom: {
    fontSize: 20,
    color: "black",
    marginLeft: -100,
  },
  chatButton: {
    backgroundColor: "#707070", // 更深的灰色背景
    paddingVertical: 10,
    borderRadius: 10, // 圆角
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  chatButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailItem;
