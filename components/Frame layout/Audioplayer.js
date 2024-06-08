import { StyleSheet, Text, View ,SafeAreaView,Modal,Image, Pressable} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Dimensions } from 'react-native'
import { AntDesign } from 'react-native-vector-icons';
import { Feather } from 'react-native-vector-icons'
import { useList } from '../../hooks/ListProvider';
import Slider from '@react-native-community/slider';

export default function Audioplayer({opened,onClose}) {

  const {Currentaudio}=useList()
  const {isPlaying}=useList()
  const {handlePlayAudio}=useList()
  const {PlaybackPosition}=useList()
  const {PlaybackDuration}=useList()
  const Calculateseekbar=()=>{
    if(PlaybackPosition!==null && PlaybackDuration!==null){
      return PlaybackPosition/PlaybackDuration
    }
    return 0
  }
  //console.log(Currentaudio)
  //console.log(Currentaudio.Actor)
  //const Calculateseekbar=()=>{
  //  if(PlaybackPosition!==null && //PlaybackDuration!==null){
  //    return PlaybackPosition/PlaybackDuration
  //  }
  //  return 0
 // }
  //console.log(Calculateseekbar())
  //Calculateseekbar()
  return (
    <Modal visible={opened} onRequestClose={onClose} animationType='slide'>
      <SafeAreaView style={styles.playbox}>
         <View style={styles.header}>
              <View style={{width:60,
                height:60,
              }} ><AntDesign onPress={onClose} name='arrowleft' size={35} color={Colors.LIGHT} style={styles.iconbt}/></View>
              <View style={{width:Dimensions.get('window').width-65,height:60}}><Text numberOfLines={1} style={styles.text}>{Currentaudio.title}</Text></View>   
          </View>
           <View style={{height:Dimensions.get('window').height-120}}>
                <View style={styles.imgbx}>
                <Image src={Currentaudio.image} style={styles.image}/>
                </View>
                <View style={{height:140,
                  marginHorizontal:40,
                  marginVertical:20
                }}>
                  <View style={styles.box}><Text style={styles.txt}>Title:</Text><Text numberOfLines={1} style={styles.dettext}>{Currentaudio.title}</Text></View>
                  <View style={styles.box}><Text style={styles.txt}>Movie:</Text><Text numberOfLines={2}  style={styles.dettext}>{Currentaudio.Movie}</Text></View>
                  <View style={styles.box}><Text style={styles.txt}>Singer:</Text><Text numberOfLines={1}  style={styles.dettext}>{Currentaudio.Artist}</Text></View>
                </View>
                <View>
                <Slider
                  style={{width:Dimensions.get('window').width-60, height: 40,alignSelf:'center'}}
                  minimumValue={0}
                  maximumValue={1}
                  value={Calculateseekbar()}
                  minimumTrackTintColor={Colors.PRIMARY}
                  maximumTrackTintColor={Colors.BORDER}
                />
                </View>
                <View style={styles.Btns}>
                  <Pressable style={styles.backword} >
                  <Feather name='skip-back' color={Colors.LIGHT} size={35}/>
                  </Pressable>
                  <Pressable style={styles.play} onPress={()=>handlePlayAudio(Currentaudio)}>{!isPlaying?<Feather name='play' color={Colors.LIGHT} size={35}/>:<Feather name='pause' color={Colors.LIGHT} size={35}/>}</Pressable>
                  <Pressable style={styles.forword}> 
                  <Feather name='skip-forward' color={Colors.LIGHT} size={35}/>
                  </Pressable>
                </View>
           </View>
      </SafeAreaView>
     </Modal>
  )
}

const styles = StyleSheet.create({
    playbox:{
        backgroundColor:Colors.DARK,
        flex:1,
        //justifyContent:'center',
        //alignItems:'center'
      },
      header:{
        // backgroundColor:'red',
         //flex:1,
         width:Dimensions.get('window').width,
         borderBottomWidth:0.5,
         flexDirection:'row',
         flexWrap:'wrap'
      },
      text:{
        color:Colors.PRIMARY,
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center',
        paddingTop:12
      },
      iconbt:{
        alignSelf:'center',
        //paddingTop:12,
        width:50,
        height:50,
        //backgroundColor:'yellow',
        marginTop:7
      },
      image:{
        height:150,
        width:150,
       // marginTop:70,
        borderWidth:1,
        borderColor:Colors.PLAY_BOR,
        borderRadius:75,
        backgroundColor:Colors.DARK
      },
      dettext:{
        fontSize:20,
        //padding:7,
       //backgroundColor:'red',
        width:230,
        //textAlign:'center',
        color:Colors.PRIMARY,
        fontWeight:'bold'
      },
      box:{
         flexDirection:'row',
         padding:7
      },
      txt:{
        fontSize:20,
        fontWeight:'700',
        opacity:0.5,
        width:70,
        color:Colors.LIGHT,
        textAlign:'center'
      },
      imgbx:{
        height:300,
        width:300,
        alignSelf:'center',
        borderWidth:3,
        borderColor:Colors.BORDER,
        backgroundColor:Colors.PRIMARY,
        borderRadius:150,
        justifyContent:'center',
        alignItems:'center',
        marginTop:60,
        marginBottom:20
      },
      Btns:{
        width:220,
       // flex:1,
       height:60,
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'space-around',
        alignItems:'center',
        //backgroundColor:'red'
      },
      forword:{
       // backgroundColor:'yellow',
        height:45,
        width:45,
        alignItems:'center',
        justifyContent:'center'
      },
      backword:{
        //backgroundColor:'yellow',
        height:45,
        width:45,
        alignItems:'center',
        justifyContent:'center'
      },
      play:{
        //backgroundColor:'yellow',
        height:45,
        width:45,
        alignItems:'center',
        justifyContent:'center'
      }
})