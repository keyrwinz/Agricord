import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Color, BasicStyles} from 'common';

class RecentTasks extends Component {
  constructor(props) {
    super(props);
  }
  renderRecentTasks = () => {
    const tasks = this.props.tasks;
    return tasks.map(task => {
      return (
        <TouchableOpacity style={styles.Task} key={task.id} onPress={() => {}}>
          <Text style={styles.TaskTextStyle}>{task.task}</Text>
        </TouchableOpacity>
      );
    });
  };
  render() {
    return (
      <View style={styles.RecentTasksContainer}>
        <View style={styles.RecentTasksTitleContainer}>
          <Text style={styles.RecentTasksTitleTextStyle}>
            {this.props.title}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
          }}>
          {this.renderRecentTasks()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RecentTasksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    marginTop: 10,
  },
  RecentTasksTitleContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  RecentTasksTitleTextStyle: {
    fontWeight: 'bold',
    fontSize: BasicStyles.titleText.fontSize,
  },
  Task: {
    height: 35,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5A84EE',
    borderRadius: 12,
    marginHorizontal: 7,
  },
  TaskTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
  },
});
export default RecentTasks;
