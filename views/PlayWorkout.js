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
import EndWorkout from './EndWorkout'



export const MoveCard = (props) =>{
    console.log(props)
    const move=props.move
    return (
      <TouchableOpacity style={styles.moveBox}
        onPress={props.onTap}
        >
        {/* MOVE NAME and REMOVE BTN*/}
        <View style={styles.moveNameWrapper}>
          <Text style={styles.moveText}> {move.move} </Text>
        </View>
        {/* MODE TOGGLE + DURATION*/}
        <View style={styles.durationWrapper}>
        <Text style={styles.modeBtnText}>{move.mode}</Text>
          {/* DURATION INPUT*/}
          <TextInput
            value={`${move.duration}`}
            style={styles.nameInput}
            editable={false}>
          </TextInput>
          {move.mode==='Timer' && <Text style={styles.mutedLabel}>secs</Text>}
        </View>
      </TouchableOpacity>
    )
}


//MAIN COMPONENT
export default class PlayView extends Component {
  constructor(props){
    super(props)
    this.state = Object.assign({}, store.getState(), {card:0})
    this.handleCardChange = this.handleCardChange.bind(this)
  }

  handleTimeChange(newTime){
    this.setState({duration: time})
  }

  handleCardChange(){
    console.log('LEN', this.state.workout.length)
    console.log('Im inside CARD CHANGEEE', this.state.card)
    if(this.state.card+1<this.state.workout.length){
      this.setState({card: this.state.card+1})
    } else {
      this.props.navigator.push({component: EndWorkout})
    }
  }

  render(){
    const workout = this.state.workout
    return (
      <View style={{flex:1}} pointerEvents='box-none'>
        <ScrollView>
        <View style={styles.containerView} pointerEvents='box-none'>
          <TextInput
            style={styles.nameInput}
            value={this.state.name}
            ></TextInput>
          <MoveCard  move={workout[this.state.card]} onTap={this.handleCardChange}/>
        </View>
        </ScrollView>
        <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.controlBtn} onPress={this.handleAddMore}>
            <Text style={styles.playBtnText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={() => this.props.navigator.push({component: PlayWorkout})}>
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
