import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

class Task extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.TaskContainer, {height: this.props.height}]}>
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

const styles = StyleSheet.create({
  TaskContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    height: 300,
    width: '85%',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#5A84EE',
    borderBottomWidth: 4,
    width: '100%',
    height: 55,
  },
  TitleIconContainer: {
    paddingLeft: 15,
  },
  TitleIconStyle: {},
  TitleTextContainer: {
    paddingLeft: 10,
  },
  TitleTextStyle: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  ChildrenContainer: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
});

export default Task;
