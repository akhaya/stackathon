import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native'
import WorkoutsList from './WorkoutsList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 70,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  searchAlingment: {
    alignSelf: 'center',
    width: 200,
    height: 30
  },
  searchInput: {
    height: 36,
    padding: 4,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#A6E1FA',
    borderRadius: 8,
    color: '#A6E1FA'
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
          <View style={styles.searchAlingment}>
          <TextInput style={styles.searchInput}
                     value={this.state.text}
          />
          </View>
          <WorkoutsList />
      </View>
    )
  }
}
