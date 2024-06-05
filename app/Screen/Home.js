import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import Recentlist from '../../components/Frame layout/Recentlist'
import Quickpick from '../../components/Frame layout/Quickpick'
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useList } from '../../hooks/ListProvider'
import { Pause , Play,Resume,Playnext } from '../../components/AudioControler'


export default function Home() {
  const [randomlist,setrandomlist]=useState([])
  const { list } = useList()
  const { reload }= useList()
  const { setreload }= useList()
  //console.log(list)
  const { HandleSet }=useList()
  const {recentlist }=useList()
  const {recentview}=useList()
  const {setrecentview}=useList()
  const {setrecentlist}=useList()
  const findrecent=async()=>{
    const result=await AsyncStorage.getItem('Recentlist');
    if(result===null) return setrecentview(false);

    setrecentview(true)
    setrecentlist(JSON.parse(result))
  }
  if(reload){
    findrecent()
    setreload(false)
  }


  const random = () => {
    let data=[]
    for(i=0;i<30;i++){
        data.push(list[Math.floor(Math.random()*list.length)]);
    }
    //console.log(data)
    return setrandomlist(data)
}

const onsubmit=(items)=>{
  //console.log(items)
  HandleSet(items)
}  

  useEffect(()=>{
    random();
    findrecent();
    //AsyncStorage.removeItem('Recentlist')
  },[])
  return (
    <ScrollView style={styles.area}>
      {recentview?<View style={styles.recentarea}>
         <Text style={styles.text}>Recent :</Text>
         <Recentlist Recent={recentlist} onSubmit={onsubmit}/>
      </View>:null}
      <View style={styles.quickarea}>
         <Text style={styles.text}>Quick Pick :</Text>
         <Pressable style={styles.refresh} onPress={()=>random()}><Text style={[styles.text,{paddingRight:5}]}>Refresh</Text></Pressable>
        {randomlist.map((items)=>(
          <Pressable>
         <Quickpick item={items} handleaudio={()=>onsubmit(items)}/></Pressable>
         ))}
      </View>
      <View style={{height:80}}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  area:{
    flex:1,
    backgroundColor:Colors.DARK,
  },
  recentarea:{
    height:220,
    paddingLeft:10,
    margin:10
  },
  quickarea:{
    paddingLeft:10,
    margin:10
  },
  text:{
    color:Colors.LIGHT,
    fontSize:20,
    fontFamily:'righteous',
  },
  refresh:{
     alignSelf:'flex-end',  
     marginLeft:5,
  }
})