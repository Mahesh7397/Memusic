import { Stack } from "expo-router";
import { StatusBar, View ,Image, StyleSheet, Modal, Dimensions} from "react-native";
import Intro from "./Intro";
import { useEffect, useState } from "react";
import {Colors} from '../constants/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from 'expo-font';
import ListProvider from "../hooks/ListProvider";
import PlayerBar from "../components/Frame layout/PlayerBar";

export default function RootLayout() {
  const [user,setuser]=useState('')
  const [firsttimeopen,setfirsttimeopen]=useState(false)
  
  const Fonts=useFonts({
    righteous:require('../assets/fonts/Righteous-Regular.ttf'),
    spacemono:require('../assets/fonts/SpaceMono-Regular.ttf'),
    arimo:require('../assets/fonts/Arimo-VariableFont_wght.ttf'),
})


  const finduser=async()=>{
      const result=await AsyncStorage.getItem('User');
      if(result===null) return setfirsttimeopen(true);

      setfirsttimeopen(false);
      setuser(JSON.parse(result));
  }

  useEffect(()=>{
      finduser()
      //AsyncStorage.clear()
  },[])

  return (
    <ListProvider>
    <View style={{flex:1,backgroundColor:Colors.DARK,position:'relative'}}>
      <StatusBar barStyle='light-content' backgroundColor={Colors.DARK}/>
      {firsttimeopen?<Intro onFinish={finduser}/>:
     <Stack >
      <Stack.Screen name="index" options={{
        title:'Memusic',
        headerStyle:{
          backgroundColor:Colors.DARK,
        },
        headerTitleStyle:{
          fontSize:35,
          color:Colors.PRIMARY,
          fontFamily:'righteous',
        },
        headerLeft:()=><Image source={require('../assets/images/adaptive-icon.png')} style={styles.image}/>,
      }}/>
     </Stack>}
     <PlayerBar/>
    </View>
    </ListProvider>
  );
}

const height=Dimensions.get('window').height - 90
const styles=StyleSheet.create({
  image:{
     width:50,
     height:50,
     paddingRight:5,
     marginRight:5,
  }
})