import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Home from "./Screen/Home";
import Search from "./Screen/Search";
import Playlist from "./Screen/Playlist";
import Settings from "./Screen/Settings";
import { Colors } from "../constants/Colors";
//import { Colors } from "react-native/Libraries/NewAppScreen";

const Tabs=createBottomTabNavigator()

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
         <Tabs.Navigator screenOptions={{
          headerShown:false,
          tabBarStyle:{
            backgroundColor:Colors.DARK,
            height:60,
            borderColor:Colors.DARK
          },
          tabBarShowLabel:false,
          tabBarActiveTintColor:Colors.PRIMARY,
         }}>
          <Tabs.Screen name="Home" component={Home} />
          <Tabs.Screen name="Search" component={Search}/>
          <Tabs.Screen name="Playlist" component={Playlist}/>
          <Tabs.Screen name="Settings" component={Settings}/>
         </Tabs.Navigator>
    </View>
  );
}
