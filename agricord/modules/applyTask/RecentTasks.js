import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'modules/applyTask/Styles.js';

class RecentTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  renderRecentTasks = () => {
    const { data } = this.props;
    return data.slice(0, 3).map((item, index) => {
      return (
        <TouchableOpacity
          style={styles.Task}
          key={index}
          onPress={() => {
            if (this.state.isClicked) {
              this.props.handleRemoveItem();
            } else {
              this.props.handleSelect(item);
            }
            this.setState({isClicked: !this.state.isClicked});
          }}>
          <Text style={styles.TaskTextStyle}>{item.name}</Text>
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
