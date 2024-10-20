import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePost from "./screens/CreatePost";
import Search from "./screens/Search";
import AllItems from "./screens/AllItems";
import FavoriteItems from "./screens/FavoriteItems";
import Chat from "./screens/Chat";
import Profile from "./screens/Profile";
import DetailItem from "./screens/DetailItem";
import { GlobalStyles } from "./constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import IconButton from "./component/UI/IconButton";

import SearchResults from "./screens/SearchResults";

import { TouchableOpacity } from "react-native"; // 添加这一行
import { useState } from "react";
import LoginScreen from "./Login/LoginScreen";
import CreateAccount from "./Login/CreateAccount";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ItemsOverview({ setIsLoggedIn }) {
  const navigation = useNavigation();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        tabBarActiveTintColor: "white",
      }}
    >
      <BottomTabs.Screen
        name="AllItems"
        component={AllItems}
        options={{
          title: "University of Virginia",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <IconButton
              name="search"
              size={24}
              color="white"
              onPress={() => navigation.navigate("Search")}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="FavoriteItems"
        component={FavoriteItems}
        options={{
          title: "Wish List",
          tabBarLabel: "Wish List",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Chat"
        component={Chat}
        options={{
          title: "Chat",
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        options={{
          title: "Account",
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {(props) => <Profile {...props} setIsLoggedIn={setIsLoggedIn} />}
      </BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login" options={{ headerShown: "false" }}>
                {(props) => (
                  <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="CreateAccount"
                options={{ headerTitle: "Create Account" }}
              >
                {(props) => (
                  <CreateAccount {...props} setIsLoggedIn={setIsLoggedIn} />
                )}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="ItemsOverview"
                options={{ headerShown: false }}
              >
                {(props) => (
                  <ItemsOverview {...props} setIsLoggedIn={setIsLoggedIn} />
                )}
              </Stack.Screen>

              <Stack.Screen name="Search" component={Search} />

              <Stack.Screen name="SearchResults" component={SearchResults} />
              <Stack.Screen name="CreatePost" component={CreatePost} />

              <Stack.Screen
                name="DetailItem"
                component={DetailItem}
                options={({ navigation }) => ({
                  headerTitle: "",
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <MaterialCommunityIcons
                        name="home"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  ),
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
