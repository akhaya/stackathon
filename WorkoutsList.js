import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} from 'react-native'

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    padding: 12,
    alignItems: 'center'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    alignSelf: 'flex-start'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
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
        'dead lift'
      ])
    }
  }
  render () {
    return (
      <ListView dataSource={this.state.dataSource}
                renderRow={(data) => Row(data)}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    )
  }
}

const Row = (workout) => (
  <View style={styles.rowContainer}>
    <Text style={styles.text}>
      {workout}
     </Text>
    </View>
)
