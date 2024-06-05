import { StyleSheet, Text, View ,SafeAreaView,Modal} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Dimensions } from 'react-native'
import { AntDesign } from 'react-native-vector-icons'

export default function Audioplayer({opened,onClose}) {
  return (
    <Modal visible={opened} onRequestClose={onClose}>
      <SafeAreaView style={styles.playbox}>
         <View style={styles.header}>
           <AntDesign name='arrowleft' size={30} color={Colors.LIGHT}/>
           <Text numberOfLines={1} style={styles.text}>Title</Text>
         </View>
         <View style={styles.body}>
          
         </View>
         <View style={styles.footer}>
            <Text>Songname</Text>
         </View>
      </SafeAreaView>
     </Modal>
  )
}

const styles = StyleSheet.create({
    playbox:{
        backgroundColor:Colors.DARK,
        flex:1,
        flexDirection:'column',
        position:'relative',
        //justifyContent:'center',
        //alignItems:'center'
      },
      header:{
         height:50,
        // backgroundColor:'red',
         width:Dimensions.get('window').width,borderBottomWidth:0.5,
         flexDirection:'row',
         justifyContent:'center',
         //alignItems:'center'
      },
      body:{
        
        flex:1
      },
      footer:{
       borderTopWidth:0.4,
       height:60,
       //alignSelf:'flex-end'
      },
      text:{
        color:Colors.LIGHT,
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center'
      }
})