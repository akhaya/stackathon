import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  NavigatorIOS
} from 'react-native'
import store from '../store'
import {styles} from './modifyWorkout'
import EndWorkout from './EndWorkout'

const playStyles = StyleSheet.create({
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
  durationWrapper: {
    flexDirection: 'column',
    alignItems: 'center'
  },
})

export class MoveCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      duration: this.props.move.duration,
      intervalId: null
    }
    this.createTimer = this.createTimer.bind(this)
  }
  componentDidMount () {
    this.createTimer(this.props)
  }

  componentWillReceiveProps (nextProps) {
    clearInterval(this.state.intervalId)
    this.createTimer(nextProps)
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId)
  }

  createTimer (props) {
    this.setState({duration: props.move.duration, intervalId: null})
    if (props.move.mode === 'Timer') {
      const id = setInterval(
        function () {
          if (this.state.duration === 0) {
            clearInterval(this.state.intervalId)
            props.onTap()
          } else {
            this.setState({duration: this.state.duration - 1})
          }
        }.bind(this), 1000
      )
      this.setState({intervalId: id})
    }
  }

  render () {
    const move = this.props.move

    return (
      <TouchableOpacity style={playStyles.moveBox}
        onPress={this.props.onTap}
        >
        {/* MOVE NAME and REMOVE BTN */}
        <View style={styles.moveNameWrapper}>
          <Text style={styles.moveText}> {move.move} </Text>
        </View>
        {/* MODE*/}
        <View style={playStyles.durationWrapper}>
          {/* DURATION */}
          <TextInput
            value={`${this.state.duration}`}
            style={styles.nameInput}
            editable={false}>
          </TextInput>
          <Text style={styles.mutedLabel}>{move.mode === 'Timer'? "SECS" : "REPS" }</Text>
        </View>
      </TouchableOpacity>
    )
  }
 }

// MAIN COMPONENT
export default class PlayView extends Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, store.getState(), {card: 0})
    this.handleCardChange = this.handleCardChange.bind(this)
  }

  handleTimeChange (newTime) {
    this.setState({duration: newTime})
  }

  handleCardChange () {
    if (this.state.card + 1 < this.state.workout.length) {
      this.setState({card: this.state.card + 1})
    } else {
      this.props.navigator.push({component: EndWorkout})
    }
  }

  render () {
    const workout = this.state.workout
    return (
      <View style={{flex: 1}} pointerEvents='box-none'>
        <ScrollView>
        <View style={styles.containerView} pointerEvents='box-none'>
          <TextInput
            style={styles.nameInput}
            value={this.state.name}
            ></TextInput>
          <MoveCard move={workout[this.state.card]} onTap={this.handleCardChange}/>
        </View>
        </ScrollView>
        <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => this.props.navigator.push({component: EndWorkout})}>
            <Text style={styles.playBtnText}>End</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
