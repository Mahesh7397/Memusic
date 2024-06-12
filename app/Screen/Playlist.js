import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Entypo } from '@expo/vector-icons'
import { useList } from '../../hooks/ListProvider'

export default function Playlist() {
  const {setLikedlistvisi}=useList()
  return (
    <View style={styles.area}>
       <Pressable style={styles.likebox} onPress={()=>setLikedlistvisi(true)}>
           <Entypo name='heart' size={30} color={Colors.FAVOR_COL}/>
       </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  area:{
    flex:1,
    backgroundColor:Colors.DARK,
    padding:5,
  },
  likebox:{
    height:150,
    width:150,
    borderWidth:1,
    borderColor:Colors.BORDER,
    backgroundColor:Colors.PLAY_BOR,
    borderRadius:15,
    zIndex:1000,
    margin:15,
    justifyContent:'center',
    alignItems:'center'
  }
})