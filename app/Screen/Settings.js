import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function Settings() {
  return (
    <View style={styles.area}>
      <Text>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  area:{
    flex:1,
    backgroundColor:Colors.DARK,
  }
})