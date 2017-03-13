import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  TouchableHighlight,
  Image,
  Animated
} from 'react-native'
import store from './store'
import {addMove} from './store/reducer'

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1084D1',
    margin: 30,
    marginBottom: 70
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center'
  },
  text: {
    margin: 4,
    fontSize: 18,
    alignSelf: 'flex-start'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  },
  addButton: {
    borderRadius: 50,
    backgroundColor: '#1084D1',
    width: 40,
    height: 40,
    alignSelf: 'flex-end'
  },
  image: {
    alignSelf: 'center',
    width: 40,
    height: 40
  }
})

export default class WorkoutsList extends React.Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.workoutList = ['Burpees',
      'Squats',
      'Dumbbell curl',
      'Dead lift',
      'Front-squat',
      'Crunches',
      'V-abs',
      'Mountain climbers',
      'High knees',
      'Row',
      'Bench press',
      'Pull ups',
      'Sit ups',
      'Overhead press',
      'Rest']
    this.state = {
      dataSource: ds.cloneWithRows(this.workoutList)
    }

    this.filteredWorkout = this.filteredWorkout.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }
  filteredWorkout () {
    const inputValue = this.props.searchInput
    return this.workoutList.filter(workout => workout.match(inputValue))
  }

  onAdd (workout) {
    store.dispatch(addMove(workout))
  }

  render () {
    return (
      <View style={styles.listContainer}>
      {this.props.searchInput === '' ? <ListView dataSource={this.state.dataSource}
                renderRow={(data) => <Row workout={data} onAdd={this.onAdd} key={data}/>}

                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      /> : this.filteredWorkout().map(workout => <Row workout={workout} onAdd={this.onAdd} key={workout}/>)}
      </View>
    )
  }
}

class Row extends Component {
  constructor(props){
    super(props)
    this.state ={
      visible: false,
      fadeAnim: new Animated.Value(1)
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd(){
    this.props.onAdd(this.props.workout);
    this.setState({
          visible: false,
          fadeAnim: new Animated.Value(1)
    }, () => {
      this.setState({visible: true}, () =>{
        Animated.timing(
            this.state.fadeAnim,
            {toValue:0}
            ).start()
      })
    })


  }

  render(){
    return(
      <View style={styles.rowContainer} key={this.props.workout}>
        <Text style={styles.text}>
          {this.props.workout}
        </Text>
        {this.state.visible?
        <Animated.Text style={{opacity: this.state.fadeAnim, color: '#24e289',fontSize: 16}}>Added!</Animated.Text>: null }
        <TouchableHighlight style={styles.addButton} onPress={this.handleAdd}>
          <Image source={require('./images/plus.png')} style={styles.image}/>
        </TouchableHighlight>
      </View>
    )
  }
}
