import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Color, BasicStyles} from 'common';
import styles from 'modules/applyTask/Styles.js';

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

export default RecentTasks;
