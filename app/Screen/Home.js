import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function Home() {
  return (
    <View style={styles.area}>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  area:{
    flex:1,
    backgroundColor:Colors.DARK,
  }
})