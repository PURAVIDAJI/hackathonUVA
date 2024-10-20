//Logout.js
// Logout.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

function Logout({ setIsLoggedIn, navigation }) {
  useEffect(() => {
    // Set login state to false and navigate to Login screen
    setIsLoggedIn(false);
    navigation.replace("Login"); // replace ensures the user can't go back to the previous screen
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logoutText}>Logging out...</Text>
    </View>
  );
}

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 18,
    color: "red",
  },
});
