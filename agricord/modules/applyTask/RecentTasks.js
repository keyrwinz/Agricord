import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'modules/applyTask/Styles.js';

class RecentTasks extends Component {
  constructor(props) {
    super(props);
  }

  renderRecentTasks = () => {
    const tasks = this.props.tasks;
    return tasks.map((task, index) => {
      return (
        <TouchableOpacity
          style={styles.Task}
          key={index}
          onPress={() => {
            this.props.handleSelect(index);
          }}>
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
