import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'modules/applyTask/Styles.js';
import { Color } from 'common';

class RecentTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  renderRecentTasks = () => {
    const { data, selected } = this.props;
    return data.slice(0, 3).map((item, index) => {
      return (
        <TouchableOpacity
          style={[styles.Task, {
            backgroundColor: (selected && selected.id == item.id) || (selected == item.id) ? Color.blue : Color.white
          }]}
          key={index}
          onPress={() => {
            if (this.state.isClicked) {
              this.props.handleRemoveItem();
            } else {
              this.props.handleSelect(item);
            }
            this.setState({isClicked: !this.state.isClicked});
          }}>
          <Text style={[styles.TaskTextStyle, {
            color: selected && selected.id == item.id ? Color.white : Color.blue
          }]}>{item.name}</Text>
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
