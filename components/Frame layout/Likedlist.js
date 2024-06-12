import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useList } from '../../hooks/ListProvider'
import { Colors } from '../../constants/Colors';
import Quickpick from './Quickpick';
import { useFonts } from 'expo-font';

export default function Likedlist() {

  const Fonts=useFonts({
    righteous:require('../../assets/fonts/Righteous-Regular.ttf'),
    spacemono:require('../../assets/fonts/SpaceMono-Regular.ttf'),
    arimo:require('../../assets/fonts/Arimo-VariableFont_wght.ttf'),
})

    const {Likedlistvisi}=useList()
    const {setLikedlistvisi}=useList()
    const {Likedlist}=useList()
    const { HandleSet }=useList()
    //console.log(Likedlist)
  return (
    <Modal visible={Likedlistvisi} onRequestClose={()=>setLikedlistvisi(false)} animationType='slide'>
        <View style={{height:40,backgroundColor:Colors.DARK,}}>
          <Text style={{fontSize:30,color:Colors.FAVOR_COL,fontFamily:'righteous', fontWeight:'bold',textAlign:'center'}}>Favourite</Text>
        </View>
        <ScrollView style={styles.container}>
           {Likedlist.length?Likedlist.map((items)=><Quickpick item={items} handleaudio={()=>HandleSet(items)}/>):<Text>Add Favourite Song</Text>}
           
        </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.DARK,
    //flex:1,
    padding:10,
  }
})