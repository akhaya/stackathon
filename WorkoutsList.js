import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  TouchableHighlight,
  Image
} from 'react-native'

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1084D1'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'stretch'
  },
  text: {
    margin: 4,
    fontSize: 16,
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
    this.state = {
      dataSource: ds.cloneWithRows([
        'burpees',
        'squats',
        'dumbbel curl',
        'dead lift',
        'front-squat',
        'crunches',
        'V-abs',
        'mountain climbers',
        'high knees',
        'row',
        'bench press',
        'pull ups',
        'sit ups',
        'overhead press'
      ])
    }
  }
  render () {
    return (
      <View style={styles.listContainer}>
      <ListView dataSource={this.state.dataSource}
                renderRow={(data) => Row(data)}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
      </View>
    )
  }
}

const Row = (workout) => (
  <View style={styles.rowContainer}>
    <Text style={styles.text}>
      {workout}
     </Text>
     <TouchableHighlight style={styles.addButton} onPress={onAdd}>
       <Image source={require('./images/plus.png')} style={styles.image}/>
     </TouchableHighlight>
    </View>
)

const onAdd = () => {}
