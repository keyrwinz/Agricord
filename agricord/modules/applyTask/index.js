import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  faHistory,
  faFlask,
  faTractor,
  faTh,
} from '@fortawesome/free-solid-svg-icons';
import {BasicStyles, Routes} from 'common';
import Task from 'modules/applyTask/Task';
import RecentTasks from 'modules/applyTask/RecentTasks';
import CustomPicker from 'modules/applyTask/CustomPicker.js';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import styles from 'modules/applyTask/Styles.js';
import {connect} from 'react-redux';
import ThCircleSvg from 'assets/settings/thcircle.svg';
import {Spinner} from 'components';
import Api from 'services/api';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

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
      isLoading: false,
      data: null
    };
  }

  componentDidMount(){
    const {user} = this.props.state;
    if (user == null) {
      return
    }
    const parameter = {
      merchant_id: user.sub_account.merchant.id
    };
    this.setState({isLoading: true});
    Api.request(Routes.batchesRetrieveApplyTasks, parameter, response => {
        this.setState({isLoading: false});
        this.setState({data: response.data});
      }, error => {
        this.setState({isLoading: false});
        console.log({error});
      },
    );
  }

  recentMachineHandler = item => {
    this.setState({selectedMachine: item});
  };

  recentMixHandler = item => {
    this.setState({selectedMix: item});
  };

  pickerMachineHandler = item => {
    this.setState({selectedMachine: item});
  };

  pickerMixHandler = item => {
    this.setState({selectedMix: item});
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
        this.setState({selectedMix: ''}); l
        break;
      default:
        break;
    }
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <ScrollView style={{backgroundColor: '#F1F1F1'}}>
        <View style={[styles.ApplyTaskContainer, {zIndex: 0}]}>
          {
            data && (
              <Task title="Recent" icon={faHistory} height={240} key={1}>
                <RecentTasks
                  data={data.recent_machines}
                  type="Machine"
                  title="Machines"
                  key={1}
                  handleSelect={this.recentMachineHandler}
                  handleRemoveItem={() => this.recentMachineHandler(null)}
                />
                <RecentTasks
                  type="Mix"
                  data={data.recent_spray_mixes}
                  title="Spray Mixes"
                  key={2}
                  handleSelect={this.recentMixHandler}
                  handleRemoveItem={() => this.recentMachineHandler(null)}
                />
              </Task>
            )
          }
          
          <View style={{ zIndex: 200, width: '100%', alignItems: 'center'}}>
            {
              data && (
                <View style={styles.SelectContainer}>
                  <View style={styles.SelectTitleContainer}>
                    <View style={styles.TitleIconContainer}>
                      <FontAwesomeIcon
                        color="#FFCA0C"
                        icon={faTh}
                        size={25}
                        style={styles.iconStyle}
                      />
                    </View>
                    <View style={styles.TitleTextContainer}>
                      <Text style={styles.TitleTextStyle}>Select</Text>
                    </View>
                  </View>
                  <View style={styles.ChildrenContainer}>
                  <CustomPicker
                      type="Machine"
                      data={data.machines}
                      key={1}
                      styles={{zIndex: 100}}
                      handleSelect={this.pickerMachineHandler}
                      index={1}
                      allowOpen={this.state.selectedPicker === 1 ? true : false}
                      handleSelectedPicker={this.handleSelectedPicker}
                      handleRemoveItem={() => this.pickerMachineHandler('')}
                    />
                    <CustomPicker
                      type="Mix"
                      data={data.spray_mixes}
                      key={2}
                      styles={{zIndex: 100}}
                      handleSelect={this.pickerMixHandler}
                      index={2}
                      allowOpen={this.state.selectedPicker === 2 ? true : false}
                      handleSelectedPicker={this.handleSelectedPicker}
                      handleRemoveItem={() => this.pickerMixHandler('')}
                    />
                    </View>
                  </View>
              )
            }
          </View>
          {this.state.selectedMachine !== '' &&
          this.state.selectedMix !== '' ? (
            <View style={{width: '100%', alignItems: 'center', zIndex: 0}}>
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
            </View>
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

        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
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
