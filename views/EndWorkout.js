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
  },
  playBtnText: {
    color: '#A6E1FA',
    fontSize: 20,
    textAlign: 'center',
    width: 60
  },
})

export default EndWorkout = (props) => {
  return (
    <View style={endStyles.container}>
      <View style={{margin: 70}}>
        <Text style={styles.nameInput}> You're Done! </Text>
      </View>
      <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => {
            props.navigator.popToTop()
          }}>
              <Text style={endStyles.playBtnText}>Menu</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
