import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styles from 'modules/applyTask/Styles.js';

class Task extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={[styles.TaskContainer, {height: this.props.height, zIndex: 0}]}>
        <View style={styles.TitleContainer}>
          <View style={styles.TitleIconContainer}>
            <FontAwesomeIcon
              color="#FFCA0C"
              icon={this.props.icon}
              size={25}
              style={styles.iconStyle}
            />
          </View>
          <View style={styles.TitleTextContainer}>
            <Text style={styles.TitleTextStyle}>{this.props.title}</Text>
          </View>
        </View>
        <View style={styles.ChildrenContainer}>{this.props.children}</View>
      </View>
    );
  }
}

export default Task;
