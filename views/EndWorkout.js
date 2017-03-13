import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  NavigatorIOS
} from 'react-native';
import store from  '../store'
import {styles} from './modifyWorkout'

const endStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default EndWorkout = (props) => {
  return (
    <View style={endStyles.container}>
      <View style={{margin: 70}}>
        <Text style={styles.nameInput}> You're Done! </Text>
      </View>
      <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => props.navigator.popN(3)}>
              <Text style={styles.playBtnText}>Menu</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
