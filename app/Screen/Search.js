import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function Search() {
  return (
    <View style={styles.area}>
      <Text>Search</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  area:{
    flex:1,
    backgroundColor:Colors.DARK,
  }
})