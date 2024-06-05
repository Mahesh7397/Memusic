import { Dimensions, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { useList } from '../../hooks/ListProvider'
import Quickpick from '../../components/Frame layout/Quickpick'


export default function Search() {
  const { list }=useList()
  const [text,settext]=useState('')
  const [result,setresult]=useState([])
  const [Resultnotfound,setResultnotfound]=useState(false)
  const [notfound,setnotfound]=useState(false);
  //console.log(text)
  const { HandleSet }=useList()
 

  const handleonsearch=(texts)=>{
   // console.log(texts)
      settext(texts)
      const findsong=list.filter(note=>{
        if(note.title.toLowerCase().includes(texts.toLowerCase())){
          return note;
        }
      })
      if(findsong.length){
        setresult(findsong)
        setResultnotfound(true)
        setnotfound(true)
      }
      if(!findsong.length){
        setnotfound(false)
      }
      if(!texts){
        setresult('')
        setResultnotfound(false)
      }
  }
 // console.log(result)
  return (
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.area}>
      <View style={styles.searchbar}>
          <TextInput placeholder='Search...' value={text} placeholderTextColor={Colors.BORDER} style={styles.input}
          onChangeText={handleonsearch}
          />
      </View> 
      {Resultnotfound?<View style={{flex:1}}>
        {notfound?<ScrollView style={{flex:1}}>{result.map((item)=><Pressable onPress={()=>HandleSet(item)}><Quickpick item={item}/></Pressable>)}</ScrollView>:<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={styles.notfound}>Result Not Found</Text></View>
        }
      </View>:<View style=
      {{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:Colors.BORDER,fontSize:30,opacity:0.7,zIndex:-1}}>Search...</Text></View>}
      
    </View>
    </TouchableWithoutFeedback>    
  )
}

const styles = StyleSheet.create({
  area:{
    flex:1,
    backgroundColor:Colors.DARK,
    position:'relative',
  },
  searchbar:{
    borderWidth:2,
    borderColor:Colors.PRIMARY,
    height:50,
    margin:15,
    borderRadius:50,
    justifyContent:'center',
  },
  input:{
    marginLeft:20,
    height:30,
    fontSize:20,
    color:Colors.LIGHT,
  },
  result:{
    flex:1
  },
  notfound:{
    color:'red',
    fontSize:20,
    fontWeight:'bold',
  }
})