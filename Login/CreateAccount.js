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

export default function CreateAccount({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = async () => {
    // Basic validation
    if (email === "" || username === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "All fields are required.");
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
    } else {
      try {
        // Send user data to the server for account creation
        const response = await fetch('http://10.0.2.2:3000/createaccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name: username,
            email: email,
            password: password,
          }),
        });
  
        const responseText = await response.text();  // 调试：首先读取响应为文本
        console.log("Response Text:", responseText); // 输出响应
    
        // 尝试将响应转换为 JSON
        const jsonResponse = JSON.parse(responseText);
  
        if (response.ok) {
          Alert.alert("Account Created", "Your account has been created! Please log in.");
          // Navigate to Login screen after successful account creation
          navigation.replace("Login"); // 这里更改为导航到 Login 屏幕
        } else {
          Alert.alert("Error", jsonResponse.error || "Failed to create account.");
        }
      } catch (error) {
        console.error("Account Creation Error:", error);
        Alert.alert("Error", "Failed to create account. Please try again.");
      }
    }
  };
  

  return (
    <View style={styles.container}>
      {/* 在上方添加图片 */}
      <Image
        source={require('../assets/img/uva_centrd_rgb.png')} // 确保路径正确
        style={styles.logo} // 应用样式
      />
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button title="Create Account" onPress={handleCreateAccount} color="#232D4B" />

      {/* Link back to Login screen */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>
          Already have an account? Login
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
    width: '100%', // 设置宽度为100%
    height: 130, // 根据需要调整高度
    marginBottom: 20, // 图片和下方内容之间的间距
    resizeMode: 'contain', // 确保图片按比例缩放
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
  loginText: {
    color: "#232D4B",
    textAlign: "center",
    marginTop: 20,
  },
});
