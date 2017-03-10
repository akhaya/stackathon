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
  }
})

export default class Create extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.onSearchChange = this.onSearchChange.bind(this)
  }
  onSearchChange (newText) {
    this.setState({text: newText})
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.searchAlingment}>
            <TextInput style={styles.searchInput}
                       placeholder='Search'
                       onChangeText={this.onSearchChange}
                       value={this.state.text}
                       maxLength = {40}
                       clearButtonMode="while-editing"
            />
          </View>
            <WorkoutsList searchInput={this.state.text}/>
        </View>
      </ScrollView>
    )
  }
}
