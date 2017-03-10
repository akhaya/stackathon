import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import WorkoutsList from './WorkoutsList'
import ModifyWorkout from './views/ModifyWorkout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  searchAlingment: {
    alignSelf: 'center',
    flex: 1,
    width: 315,
    height: 50,
    margin: 10
  },
  searchInput: {
    height: 36,
    padding: 4,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1084D1',
    borderRadius: 8,
    color: '#1084D1'
  },
  controlBtn:{
    borderRadius:50,
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
  }
})

export default class Create extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: 'Search'
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.searchAlingment}>
            <TextInput style={styles.searchInput}
                       value={this.state.text}
            />
          </View>
            <WorkoutsList style={styles.workoutList}/>
        </ScrollView>
        <View style={styles.controlContainer}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => this.props.navigator.push({component: ModifyWorkout})}>
            <Text style={styles.playBtnText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
