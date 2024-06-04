import { Pressable, StyleSheet, Text, TextInput, View ,Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants/Colors'
import Icon from '../constants/Icon';
//import {Fonts} from '../constants/Font'
import { useFonts } from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({onFinish}) => {
  const [User,setUser]=useState('')
  const [notfound,setnotfound]=useState(false);


  const handleuser=async()=>{
          if(User){
            setnotfound(false)
            const username={name:User}
            await AsyncStorage.setItem('User',JSON.stringify(username))
            //console.log('saved')
            if(onFinish) onFinish()
          }
          else{
             setnotfound(true)
          }
  }

  const Fonts=useFonts({
    righteous:require('../assets/fonts/Righteous-Regular.ttf'),
    spacemono:require('../assets/fonts/SpaceMono-Regular.ttf'),
    arimo:require('../assets/fonts/Arimo-VariableFont_wght.ttf'),
})


  return (
    <View style={styles.intro}>
      <View style={styles.logo}>
          <Image source={require('../assets/images/adaptive-icon.png')} style={styles.image}/> 
          <Text style={styles.title}>Memusic</Text>
      </View>
      <View style={styles.signin}>
        <View style={{paddingHorizontal:10}}>
           <Text style={styles.Text}>Enter User Name :</Text>
           <TextInput value={User} placeholder='Enter name' onChangeText={setUser} placeholderTextColor={Colors.BORDER} style={styles.input}/>
           {notfound?<Text style={styles.err}>Please enter user name</Text>:null}
        </View>
      {User.length>=3?<Pressable style={styles.onpress} onPress={handleuser}>
          <Icon iconcolor={Colors.LIGHT} iconname={'arrowright'} iconsize={30} style={styles.signbt}/>
      </Pressable>:null}
      </View>
    </View>
  )
}

export default Intro

const Width=Dimensions.get('window').width;
const Height=Dimensions.get('window').height;

const styles = StyleSheet.create({
  intro:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:Colors.DARK,
  },
  Text:{
    color:Colors.LIGHT,
    fontSize:20,
    fontFamily:'spacemono',
    color:Colors.PRIMARY,
    fontWeight:'bold',
    padding:5,
    margin:5,
  },
  input:{
    height:40,
    fontSize:25,
    fontFamily:'spacemono',
    borderWidth:2,
    borderTopColor:Colors.DARK,
    borderRightColor:Colors.DARK,
    borderLeftColor:Colors.DARK,
    borderBottomColor:Colors.LIGHT,
    //padding:5,
    //margin:5,
    marginVertical:10,
    color:Colors.PRIMARY,
    paddingHorizontal:10,
  },
  signin:{
    //borderWidth:2,
    borderColor:Colors.BORDER,
    height:Height-550,
    width:Width-50,
  },
  signbt:{
    alignSelf:'center',
  },
  onpress:{
    borderWidth:2,
    borderColor:Colors.BORDER,
    width:90,
    alignSelf:'flex-end',
    marginTop:30,
    marginRight:20,
    backgroundColor:Colors.PRIMARY,
    opacity:0.7,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:40,
    color:Colors.PRIMARY,
    fontFamily:'righteous',
  },
  logo:{
    marginBottom:30,
  },
  image:{
    width:60,
    height:60,
    alignSelf:'center',
  },
  err:{
    color:'red',
    fontSize:15,
    padding:5,
  }
})