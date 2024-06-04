import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'

export default function Quickpick({item}) {
  return ( 
      <View style={styles.Box}>
          <View>
           <Image src={item.image} style={styles.image}/>
          </View>
          <View style={{marginLeft:7}}>
              <Text style={styles.text} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.text} numberOfLines={1}>{item.Movie}</Text>
          </View>
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
      alignItems:"center"
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
    }
})