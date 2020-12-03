import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {
  faClock,
  faTimesCircle,
  faCommentDots,
} from '@fortawesome/free-regular-svg-icons';
import {faHistory, faFlask, faTractor} from '@fortawesome/free-solid-svg-icons';
import {Color, BasicStyles} from 'common';
import Task from 'modules/applyTask/Task';
import RecentTasks from 'modules/applyTask/RecentTasks';
import CustomPicker from 'modules/applyTask/CustomPicker.js';
import Slide from 'modules/slide';
const dummyData = [
  {
    id: 1,
    task: 'Machine A',
  },
  {
    id: 2,
    task: 'Machine B',
  },
  {
    id: 3,
    task: 'Machine C',
  },
];

const dummyData2 = [
  {
    id: 1,
    type: 'Mix A',
    icon: faFlask,
  },
  {
    id: 2,
    type: 'Mix B',
    icon: faFlask,
  },
  {
    id: 3,
    type: 'Mix C',
    icon: faFlask,
  },
  {
    id: 4,
    type: 'Mix D',
    icon: faFlask,
  },
];

const dummyData3 = [
  {
    id: 1,
    type: 'Machine A',
    icon: faTractor,
  },
  {
    id: 2,
    type: 'Machine B',
    icon: faTractor,
  },
  {
    id: 3,
    type: 'Machine C',
    icon: faTractor,
  },
  {
    id: 4,
    type: 'Machine D',
    icon: faTractor,
  },
];

class ApplyTask extends Component {
  render() {
    return (
      <View style={styles.ApplyTaskContainer}>
        <Task title="Recent" icon={faHistory} height={240} key={1}>
          <RecentTasks tasks={dummyData} title="Machines" key={1} />
          <RecentTasks tasks={dummyData} title="Spray Mixes" key={2} />
        </Task>
        <Task title="Select" icon={faCommentDots} height={200} key={2}>
          <CustomPicker type="Machine" items={dummyData3} key={1} />
          <CustomPicker type="Mix" items={dummyData2} key={2} />
        </Task>
        <Slide title="Select Paddocks" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ApplyTaskContainer: {
    backgroundColor: '#F1F1F1',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  SliderIconContainer: {
    backgroundColor: '#5A84EE',
    borderRadius: 12,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SliderIconTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ApplyTask;
