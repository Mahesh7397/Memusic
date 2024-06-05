import { StyleSheet, Text, View ,Image, Pressable, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native';
import React from 'react';
import Movieicon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useList } from '../../hooks/ListProvider';

export default function Recentlist({Recent,onSubmit}) {
    const  {currentaudioid} = useList()
    const  {isPlaying} = useList()
  return (
    <View>
        <FlatList
        data={Recent}
        horizontal
        renderItem={({item})=>
            <Pressable style={styles.Box} onPress={()=>onSubmit(item)}>
                 <Image src={item.image} style={styles.image}/>
                {isPlaying && currentaudioid===item.id ?<View style={[StyleSheet.absoluteFillObject,{height:90,width:90,alignSelf:'stretch',marginTop:8,marginLeft:4,justifyContent:'center'}]}><ActivityIndicator style={{alignItems:'center'}} size={40}/></View> :null} 
                 <View style={styles.detailbox}>
                     <View><Text numberOfLines={2} style={[styles.text,{fontWeight:"600"}]}>{item.title}</Text></View>
                     <View><Text numberOfLines={2} style={[styles.text,]}><Movieicon name="movie-roll" color={'#ffff'} size={17}/>:{item.Movie}</Text></View>
                </View>
            </Pressable>
        }
        />
        </View>
  )
}

const styles = StyleSheet.create({
    Box:{
        flex:1,
        width:120,
        height:200,
        borderWidth:2,
        borderColor:"transparent",
        borderRadius:10,
        padding:5,
        margin:5,
       // backgroundColor:'plum'
    },
    image:{
        width:90,
        height:90,
        marginTop:6,
        alignSelf:'stretch',
        borderRadius:7,
    },
    text:{
       color:"#ffff",
       fontWeight:"300",
       fontFamily:'arimo',
    },
    detailbox:{
        flex:1,
        paddingTop:5,
        //paddingLeft:5,
       justifyContent:'space-around',
       alignItems:'stretch',
    }
})