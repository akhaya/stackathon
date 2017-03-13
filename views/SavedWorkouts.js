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
import modifyWorkout, {styles} from './modifyWorkout'
import storage from 'react-native-simple-store'
import {setWorkout} from '../store/reducer'

// WORKOUT CARD COMPONENT
export class SavedWorkoutCard extends Component {
  constructor (props) {
    super(props)
    this.state = props || {}
  }

  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props) {
      this.setState(nextProps || null)
    }
  }

  render () {
    return (
      <View style={styles.moveBox}>
        {/* MOVE NAME and REMOVE BTN */}
        <View style={styles.moveNameWrapper}>
        <TouchableOpacity onPress={() => this.props.handleClick(this.props.savedWorkout)}>
          <Text style={styles.moveText}> {this.state.savedWorkout} </Text>
        </TouchableOpacity>
          <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => this.props.handleRemove(this.props.savedWorkout)} >
              <Text style={styles.removeBtnText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default class SavedWorkoutView  extends Component {

  constructor(props){
    super(props)
    this.state= {}
    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount(){
    storage.get('list')
      .then(list=> {
        this.setState(list)
      }).catch(console.error)
  }

  handleClick(workoutName){
    const newWorkout = {name: workoutName, workout: this.state[workoutName]}
    store.dispatch(setWorkout(newWorkout))
    this.props.navigator.push({component: modifyWorkout})
  }

  handleRemove(workoutName){
    const deleteWorkout = {name: workoutName, workout: this.state[workoutName]}
    storage.get('list')
      .then(list=> {
        delete list[workoutName]
        return storage.save('list', list)
      }).catch(console.error)
    const curr = this.state
    delete curr[workoutName]
    this.setState(curr)
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
        <View style={styles.containerView}>
          <Text style={styles.nameInput}>Saved Workouts</Text>
          {Object.keys(this.state).length ? Object.keys(this.state).map((key, i) => <SavedWorkoutCard key={i}
                                                         savedWorkout={key}
                                                         handleClick={this.handleClick}
                                                         handleRemove={this.handleRemove}
                                                          />) :
          <Text style={styles.moveText}>No saved workouts yet. Go back and add some!</Text>}
        </View>
        </ScrollView>
      </View>
    )
  }
}

