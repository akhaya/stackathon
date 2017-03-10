import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  NavigatorIOS,
  ScrollView
} from 'react-native';
import store from 'react-native-simple-store'


const dummyData = ['Burpees', 'High-Knees', 'Crunches', 'Push-Ups']

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingBottom: 70
  },
  nameInput: {
    height: 40,
    flex: 1,
    fontSize: 30,
    padding: 4,
    margin: 15,
    textAlign: 'center'
  },
  workoutView: {
    flex: 3,
    justifyContent: 'space-around'
  },
  moveBox: {
    flex: 1,
    shadowColor: '#e3e3e3',
    shadowOffset: {
      width: 0,
      height: 3
    },
    margin: 10,
    shadowRadius: 5,
    shadowOpacity: 0.75
  },
  moveText: {
    fontSize: 25,
    textAlign: 'center',
    paddingRight: 20,
    paddingTop: 20,
  },
  modeBtn: {
    height: 25,
    width: 80,
    marginLeft: 20
  },
  modeBtnText: {
    color: '#1084D1',
    fontSize: 25
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mutedLabel: {
    color: 'silver',
    fontSize: 20,
    paddingRight: 10,
    textAlign: 'left'
  },
  durationInput: {
    height: 40,
    flex: 1,
    fontSize: 25,
    padding: 4,
    margin: 15,
    textAlign: 'right'
  },
  controlBtn:{
    borderRadius:50,
    backgroundColor: '#001C55',
    width: 100,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25
  },
  playBtnText: {
    color: '#A6E1FA',
    fontSize: 20,
    textAlign: 'center',
    width: 50
  },
  controlContainer: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: '90%',
    backgroundColor: 'rgba(0,0,0,0)'
  }
})

export class WorkoutMove extends Component {
  constructor(props){
    super(props)
    this.state = {
      mode: 'Reps',
      duration: 10
    }
    this.modeToggle = this.modeToggle.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
  }

  modeToggle(){
    if(this.state.mode ==='Reps') {
      this.setState({mode:'Timer'})
    }
    else {
      this.setState({mode:'Reps'})
    }
  }
  handleDurationChange(newDuration){
    this.setState({duration: +newDuration})
  }
  render() {
    const move = this.props.move
    console.log(this.state.mode)
    return (
      <View style={styles.moveBox}>
        {/* MOVE NAME*/}
        <Text style={styles.moveText}> {move} </Text>
        {/* MODE TOGGLE + DURATION*/}
        <View style={styles.durationWrapper}>
          <TouchableOpacity
            style={styles.modeBtn}
            onPress={this.modeToggle} >
            <Text style={styles.modeBtnText}>{this.state.mode}</Text>
          </TouchableOpacity>
          {/* DURATION INPUT*/}
          <TextInput
            value={`${this.state.duration}`}
            style={styles.nameInput}
            onChangeText={this.handleDurationChange}>
          </TextInput>
          {this.state.mode==='Timer' && <Text style={styles.mutedLabel}>secs</Text>}
        </View>
      </View>
    )
  }
}

//MAIN COMPONENT
export default class ModifyWorkout extends Component {
  constructor(){
    super()
    this.state = {
      workoutName: 'Workout Name',
      tempWorkout: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(newName){
    this.setState({workoutName: newName})
  }

  render(){
    return (
      <View style={{flex:1}}>
        <ScrollView>
        <View style={styles.containerView}>
          <TextInput
            style={styles.nameInput}
            value={this.state.workoutName}
            onChangeText={this.handleNameChange}
            clearButtonMode="while-editing"
            editable = {true}
            returnKeyType='done'
            ></TextInput>
          {dummyData.map((m,i) => <WorkoutMove key={i} move={m}/>)}
        </View>
        </ScrollView>
        <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.controlBtn}>
            <Text style={styles.playBtnText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn}>
            <Text style={styles.playBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
