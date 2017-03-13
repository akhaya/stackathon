import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  NavigatorIOS,
  ScrollView
} from 'react-native'
import storage from 'react-native-simple-store'
import store from '../store'
import {updateName, removeMove, updateDuration, updateMode} from '../store/reducer'
import PlayWorkout from './PlayWorkout'

export const styles = StyleSheet.create({
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
    textAlign: 'center',
    color: '#001C55'
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
    paddingTop: 20
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
  controlBtn: {
    borderRadius: 50,
    backgroundColor: '#1084D1',
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
    top: '90%'
  },
  removeBtn: {
    borderRadius: 50,
    backgroundColor: 'rgba(100,0,0,0.1)',
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25
  },
  removeBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center'
  },
  moveNameWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})

// MOVE CARD COMPONENT
export class WorkoutMove extends Component {
  constructor (props) {
    super(props)
    this.state = props.move
    this.modeToggle = this.modeToggle.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.setState(nextProps.move)
    }
  }

  modeToggle () {
    if (this.state.mode === 'Reps') {
      this.props.submitMode(this.state.id, 'Timer')
      // this.setState({mode: 'Timer'})
    } else {
      this.props.submitMode(this.state.id, 'Reps')
      // this.setState({mode: 'Reps'})
    }
  }

  handleDurationChange (newDuration) {
    this.setState({duration: +newDuration})
  }
  render () {
    const move = this.state
    return (
      <View style={styles.moveBox}>
        {/* MOVE NAME and REMOVE BTN */}
        <View style={styles.moveNameWrapper}>
          <Text style={styles.moveText}> {move.move} </Text>
          <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => this.props.onRemove(move.id)} >
              <Text style={styles.removeBtnText}>X</Text>
          </TouchableOpacity>
        </View>
        {/* MODE TOGGLE + DURATION */}
        <View style={styles.durationWrapper}>
          <TouchableOpacity
            style={styles.modeBtn}
            onPress={this.modeToggle} >
            <Text style={styles.modeBtnText}>{move.mode}</Text>
          </TouchableOpacity>
          {/* DURATION INPUT */}
          <TextInput
            value={`${move.duration}`}
            style={styles.nameInput}
            onChangeText={this.handleDurationChange}
            onEndEditing = {() => this.props.submitDuration(+move.id, +this.state.duration)}>
          </TextInput>
          {move.mode === 'Timer' && <Text style={styles.mutedLabel}>secs</Text>}
        </View>
      </View>
    )
  }
}

// MAIN COMPONENT
export default class ModifyWorkout extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState()
    this.handleNameChange = this.handleNameChange.bind(this)
    this.submitName = this.submitName.bind(this)
    this.handleAddMore = this.handleAddMore.bind(this)
    this.submitDuration = this.submitDuration.bind(this)
    this.submitMode = this.submitMode.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleNameChange (newName) {
    this.setState({name: newName})
  }
  submitName () {
    store.dispatch(updateName(this.state.name))
  }

  handleRemove (moveId) {
    store.dispatch(removeMove(moveId))
  }

  handleAddMore () {
    this.props.navigator.pop()
  }

  submitDuration (id, value) {
    store.dispatch(updateDuration(id, value))
  }

  submitMode (id, value) {
    store.dispatch(updateMode(id, value))
  }

  render () {
    const workout = this.state.workout
    return (
      <View style={{flex: 1}}>
        <ScrollView>
        <View style={styles.containerView}>
          <TextInput
            style={styles.nameInput}
            value={this.state.name}
            onChangeText={this.handleNameChange}
            onEndEditing = {this.submitName}
            clearButtonMode="while-editing"
            editable = {true}
            returnKeyType='done'
            ></TextInput>
          {this.state.workout.length > 0? this.state.workout.map((m, i) => <WorkoutMove key={m.id}
                                                         move={m}
                                                         onRemove={this.handleRemove}
                                                         submitDuration={this.submitDuration}
                                                         submitMode={this.submitMode}
                                                          />) :
          <Text style={styles.moveText}>No moves yet. Go back and add some!</Text>}
        </View>
        </ScrollView>
        <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.controlBtn} onPress={this.handleAddMore}>
            <Text style={styles.playBtnText}>Add</Text>
          </TouchableOpacity>
          { this.state.workout.length > 0?
            <View>
            <TouchableOpacity style={styles.controlBtn} onPress={() => this.props.navigator.push({component: PlayWorkout})}>
              <Text style={styles.playBtnText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn}>
              <Text style={styles.playBtnText}>Save</Text>
            </TouchableOpacity> </View>: null }
        </View>
      </View>
    )
  }
}
