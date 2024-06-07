import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useList } from '../../hooks/ListProvider'
import { Colors } from '../../constants/Colors';
import { Entypo } from '@expo/vector-icons';

export default function PlayerBar({onAudioPlayer}) {

  const {Currentaudio}=useList()
  const {isPlaying}=useList()
  const {seaudio}=useList()
  const {handlePlayAudio}=useList()
  if(!seaudio){
    return null
  }
  return(
    < Pressable style={styles.box} onPress={onAudioPlayer}>
          <View>
             <Image src={Currentaudio.image} style={styles.image}/>
          </View>
          <View style={styles.textbx}>
          <Text style={styles.text} numberOfLines={1}>{Currentaudio.title}</Text>
              <Text style={styles.text} numberOfLines={1}>{Currentaudio.Movie}</Text>
          </View>
          <Pressable style={styles.press} onPress={()=>handlePlayAudio(Currentaudio)}>
          {isPlaying ?<Entypo name="controller-paus" size={30} color={Colors.LIGHT}/>:<Entypo name="controller-play" size={30} color={Colors.LIGHT} />}
          </Pressable>
       </Pressable>
  )
}

const styles = StyleSheet.create({
    box:{
        height:65,
        width:Dimensions.get('window').width - 20,
        backgroundColor:Colors.DARK,
       // backgroundColor:'#1A1A1A',
        alignSelf:'center',
        position:'absolute',
        bottom:80,
        borderRadius:15,
        borderWidth:1,
        borderColor:Colors.PLAY_BOR,
        zIndex:1000,
        flex:1  ,
        flexDirection:'row',
        alignItems:'center'
      },
      image:{
        marginHorizontal:8,
        height:50,
        width:50,
        //borderWidth:1,
        //borderColor:'#ffff',
        borderRadius:8
     },
     text:{
        color:Colors.LIGHT,
        width:200
     },
     textbx:{
        paddingHorizontal:5,
        marginLeft:7
     },
     press:{
        position:'absolute',
        right:30,
        height:50,
        width:50,
        //backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
     }
})