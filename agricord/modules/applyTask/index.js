import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  faHistory,
  faFlask,
  faTractor,
  faTh,
} from '@fortawesome/free-solid-svg-icons';
import {BasicStyles} from 'common';
import Task from 'modules/applyTask/Task';
import RecentTasks from 'modules/applyTask/RecentTasks';
import CustomPicker from 'modules/applyTask/CustomPicker.js';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import styles from 'modules/applyTask/Styles.js';
import {connect} from 'react-redux';

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

const dummyData4 = [
  {
    id: 1,
    task: 'Mix A',
  },
  {
    id: 2,
    task: 'Mix B',
  },
  {
    id: 3,
    task: 'Mix C',
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
  constructor(props) {
    super(props);
    this.state = {
      selectedMachine: '',
      selectedMix: '',
      selectedPicker: 0,
    };
  }

  recentMachineHandler = index => {
    let machine = dummyData[index].task;
    this.setState({selectedMachine: machine});
  };

  recentMixHandler = index => {
    let mix = dummyData4[index].task;
    this.setState({selectedMix: mix});
  };

  pickerMachineHandler = index => {
    let machine = dummyData3[index].type;
    this.setState({selectedMachine: machine});
  };

  pickerMixHandler = index => {
    let mix = dummyData2[index].type;
    this.setState({selectedMix: mix});
  };

  handleSelectedPicker = index => {
    this.setState({selectedPicker: index});
  };

  selectPaddocks = () => {
    const {setMachineAndMix} = this.props;
    if (this.state.selectedMachine !== '' && this.state.selectedMix !== '') {
      let task = {
        machine: this.state.selectedMachine,
        mix: this.state.selectedMix,
      };
      setMachineAndMix(task);
      this.props.navigation.navigate('mixPageStack', {
        details: {appliedRate: 1, status: 'Auto'},
      });
    } else {
      alert('Please select a machine or mix.');
    }
  };

  handleRemoveItem = item => {
    switch (item) {
      case 'Machine':
        this.setState({selectedMachine: ''});
        break;
      case 'Mix':
        this.setState({selectedMix: ''});
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#F1F1F1'}}>
        <View style={[styles.ApplyTaskContainer, {zIndex: 0}]}>
          <Task title="Recent" icon={faHistory} height={240} key={1}>
            <RecentTasks
              tasks={dummyData}
              type="Machine"
              title="Machines"
              key={1}
              handleSelect={this.recentMachineHandler}
              handleRemoveItem={this.handleRemoveItem}
            />
            <RecentTasks
              type="Mix"
              tasks={dummyData4}
              title="Spray Mixes"
              key={2}
              handleSelect={this.recentMixHandler}
              handleRemoveItem={this.handleRemoveItem}
            />
          </Task>
          <Task title="Select" icon={faTh} height={200} key={2}>
            <CustomPicker
              type="Machine"
              items={dummyData3}
              key={1}
              styles={{zIndex: 500}}
              handleSelect={this.pickerMachineHandler}
              index={1}
              allowOpen={this.state.selectedPicker === 1 ? true : false}
              handleSelectedPicker={this.handleSelectedPicker}
              handleRemoveItem={this.handleRemoveItem}
            />
            <CustomPicker
              type="Mix"
              items={dummyData2}
              key={2}
              styles={{zIndex: 500}}
              handleSelect={this.pickerMixHandler}
              index={2}
              allowOpen={this.state.selectedPicker === 2 ? true : false}
              handleSelectedPicker={this.handleSelectedPicker}
              handleRemoveItem={this.handleRemoveItem}
            />
          </Task>
          {this.state.selectedMachine !== '' &&
          this.state.selectedMix !== '' ? (
            <RNSlidingButton
              style={{
                marginTop: 60,
                width: '85%',
                borderRadius: 12,
                backgroundColor: '#F1F1F1',
                borderColor: '#CFCFCF',
                borderWidth: 2,
                zIndex: 0,
              }}
              height={45}
              onSlidingSuccess={() => {
                this.selectPaddocks();
              }}
              slideDirection={SlideDirection.RIGHT}>
              <View
                style={{
                  width: '100%',
                  borderRadius: 12,
                  backgroundColor: '#F1F1F1',
                  borderColor: '#CFCFCF',
                  borderWidth: 1,
                  zIndex: 0,
                }}
                height={45}
                onSlidingSuccess={() => {
                  this.selectPaddocks();
                }}
                slideDirection={SlideDirection.RIGHT}>
                <View
                  style={{
                    backgroundColor: '#5A84EE',
                    height: 45,
                    width: 129,
                    borderRadius: 12,
                    padding: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: BasicStyles.titleText.fontSize,
                      fontWeight: 'bold',
                    }}>
                    Select Paddocks
                  </Text>
                </View>
              </View>
            </RNSlidingButton>
          ) : null}
          {this.state.selectedMachine !== '' &&
          this.state.selectedMix !== '' ? (
            <View
              style={{height: 20, width: '85%', marginTop: 5, marginLeft: 15}}>
              <Text
                style={{
                  fontSize: BasicStyles.normalText.fontSize,
                  color: '#969696',
                }}>
                Swipe Right to Complete
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setMachineAndMix: task => {
      dispatch(actions.setMachineAndMix(task));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyTask);
