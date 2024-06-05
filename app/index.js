import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Home from "./Screen/Home";
import Search from "./Screen/Search";
import Playlist from "./Screen/Playlist";
import Settings from "./Screen/Settings";
import { Colors } from "../constants/Colors";
import Homeicon from 'react-native-vector-icons/AntDesign';
import Searchicon from 'react-native-vector-icons/Octicons';
//import { Colors } from "react-native/Libraries/NewAppScreen";
import Playlisticon from 'react-native-vector-icons/MaterialCommunityIcons';
import Settingicon from 'react-native-vector-icons/AntDesign'
import ListProvider from "../hooks/ListProvider";

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
          tabBarInactiveTintColor:Colors.LIGHT
         }}>
          <Tabs.Screen name="Home" component={Home} options={{
            tabBarIcon:({color})=>(
              <Homeicon name="home" color={color} size={30}/>
            )
          }} />
          <Tabs.Screen name="Search" component={Search}
          options={{
            tabBarIcon:({color})=>(
               <Searchicon name="search" size={30} color={color}/>
            )
          }}/>
          <Tabs.Screen name="Playlist" component={Playlist} 
          options={{
            tabBarIcon:({color})=>(
              <Playlisticon name="playlist-music-outline" color={color} size={34}/>
            )
          }}/>
          {/*<Tabs.Screen name="Settings" component={Settings} 
          
          options={{
            tabBarIcon:({color})=>(
              <Settingicon name="setting" size={30} color={color}/>
            )
          }}/>*/}
         </Tabs.Navigator>
    </View>
  );
}
