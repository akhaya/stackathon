/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import Create from './Search'
import ModifyWorkout from './views/modifyWorkout'


export default class landingView extends Component {
  constructor (props) {
    super(props)
    this.onPressCreate = this.onPressCreate.bind(this)
    this.onPressSaved = this.onPressSaved.bind(this)
  }

  onPressCreate () {
    this.props.navigator.push({
      component: Create,
      title: 'Create'
    })
  }

  onPressSaved () {
    // this.props.navigator.push({
    //   component: ModifyWorkout,
    //   title: 'Saved'
    // })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          FitStack
        </Text>
        <TouchableOpacity style={styles.menuBtn} onPress={this.onPressCreate}>
        <Text style={styles.menuBtnText}> Create </Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.menuBtn} onPress={this.onPressSaved}>
        <Text style={styles.menuBtnText}> Saved </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export class dummy extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Fitness App Pg 2
        </Text>
      </View>
    )
  }
}

export class navApp extends Component {
  render () {
    return (
     <NavigatorIOS
      initialRoute={{
        component: landingView,
        title: 'Fitness App'
      }}
      style={{flex: 1}}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  menuBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 50,
    width: 150,
    backgroundColor: '#1084D1'
  },
  menuBtnText: {
    color: '#A6E1FA',
    fontSize: 20,
    textAlign: 'center',
    paddingRight: 10,
    paddingLeft: 0,
    paddingTop: 3
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Helvetica'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('stackathon', () => navApp)
