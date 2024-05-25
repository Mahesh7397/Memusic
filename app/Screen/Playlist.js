import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function Playlist() {
  return (
    <View style={styles.area}>
      <Text>Playlist</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  area:{
    flex:1,
    backgroundColor:Colors.DARK,
  }
})