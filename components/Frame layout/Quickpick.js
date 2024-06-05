import { StyleSheet, Text, View,Image, Pressable} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';
import { useList } from '../../hooks/ListProvider';
import {Entypo} from 'react-native-vector-icons'

export default function Quickpick({item,handleaudio}) {
  const { isPlaying }=useList()
  const {currentaudioid}=useList()
  
  return ( 
      <View style={styles.Box}>
          <View>
           <Image src={item.image} style={styles.image}/>
          </View>
          <View style={{marginLeft:7}}>
              <Text style={styles.text} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.text} numberOfLines={1}>{item.Movie}</Text>
          </View>
            <Pressable style={{height:60,width:60,justifyContent:'center',alignItems:'center'}} onPress={handleaudio}>
              {isPlaying && currentaudioid===item.id?<Entypo name="controller-paus" size={30} color={Colors.LIGHT}/>:<Entypo name="controller-play" size={30} color={Colors.LIGHT} />}
            </Pressable>
      </View>
     
  )
}

const styles = StyleSheet.create({
    Box:{
        flex:1,
        flexDirection:"row",
      height:80,
      //wight:"auto",
      borderWidth:2,
      borderColor:"transparent",
      padding:5,
      margin:6,
      borderRadius:5,
      alignItems:"center",
      //backgroundColor:'red'
    },
    image:{
      height:60,
      width:60,
      alignSelf:"flex-start",
      marginLeft:5,
    },
    text:{
      color:"#ffff",
      fontSize:15,
      padding:5,
      width:190,
    },
    time:{
      color:Colors.BORDER
    }
})