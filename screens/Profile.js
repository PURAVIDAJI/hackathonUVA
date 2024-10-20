import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function Profile({ setIsLoggedIn }) {
  const handleLogout = () => {
    // Set the user as logged out and return to the login screen
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Profile Screen</Text>
      {/* Logout Button */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
