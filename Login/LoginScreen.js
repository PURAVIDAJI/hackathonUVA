//LoginScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // 基本验证
    if (username === "" || password === "") {
      Alert.alert("Error", "Both fields are required.");
      return;
    }

    try {
      // 向服务器发送登录请求
      const response = await fetch("http://10.0.2.2:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username,
          password: password,
        }),
      });

      const responseText = await response.text(); // 调试：首先读取响应为文本
      console.log("Response Text:", responseText); // 输出响应

      // 尝试将响应转换为 JSON
      const jsonResponse = JSON.parse(responseText);

      if (response.ok) {
        Alert.alert("Login Successful", "Welcome!");
        setIsLoggedIn(true); // 用户登录成功
        setUsername(""); // 清空输入
        setPassword(""); // 清空输入
        navigation.replace("ItemsOverview"); // 导航到主应用
      } else {
        Alert.alert(
          "Login Failed",
          jsonResponse.error || "Invalid credentials."
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login Failed", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 在上方添加图片 */}
      <Image
        source={require("../assets/img/uva_centrd_rgb.png")} // 确保路径正确
        style={styles.logo} // 应用样式
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} color="#232D4B" />

      {/* 返回到创建账户页面的链接 */}
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text style={styles.createAccountText}>
          Don't have an account? Create one
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: "100%", // 设置宽度为100%
    height: 150, // 可以根据需要调整高度
    marginBottom: 20, // 图片和下方内容之间的间距
    marginTop: 0,
    resizeMode: "contain", // 确保图片按比例缩放
  },
  header: {
    backgroundColor: "#003DA5", // 深蓝色
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  createAccountText: {
    color: "#232D4B",
    textAlign: "center",
    marginTop: 20,
  },
});
