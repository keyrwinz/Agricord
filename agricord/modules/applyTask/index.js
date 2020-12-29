import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {
  faHistory,
  faFlask,
  faTractor,
  faTh,
} from '@fortawesome/free-solid-svg-icons';
import {BasicStyles, Routes, Color} from 'common';
import Task from 'modules/applyTask/Task';
import RecentTasks from 'modules/applyTask/RecentTasks';
import CustomPicker from 'modules/applyTask/CustomPicker.js';
import styles from 'modules/applyTask/Styles.js';
import {connect} from 'react-redux';
import ThCircleSvg from 'assets/settings/thcircle.svg';
import {Spinner} from 'components';
import Api from 'services/api';
import SlidingButton from 'modules/generic/SlidingButton';
const height = Math.round(Dimensions.get('window').height);

class ApplyTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMachine: null,
      selectedMix: null,
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
    const { setTask } = this.props;
    const { selectedMachine, selectedMix } = this.state;
    if (selectedMachine && selectedMix) {
      let task = {
        machine: selectedMachine,
        spray_mix: selectedMix
      };
      setTask(task);
      this.props.navigation.navigate('mixPageStack', {
        data: {
          machine: selectedMachine,
          spray_mix: selectedMix
        }
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
    const { isLoading, data, selectedMix, selectedMachine } = this.state;
    const { mixConfirmation } = this.state;
    return (
      <View style={styles.MainContainer}>
        <ScrollView style={{backgroundColor: Color.containerBackground, minHeight: height}}>
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
            
            <View style={{
                zIndex: 200,
                width: '100%',
                alignItems: 'center'
              }}>
              {
                data && (
                  <Task title="Select" icon={faTh} height={200} key={2}>
                    <View style={{
                      zIndex: 20,
                      width: '100%'
                    }}>
                      <CustomPicker
                        type="Machine"
                        data={data.machines}
                        key={1}
                        styles={{zIndex: 500}}
                        handleSelect={this.pickerMachineHandler}
                        index={1}
                        allowOpen={this.state.selectedPicker === 1 ? true : false}
                        handleSelectedPicker={this.handleSelectedPicker}
                        handleRemoveItem={() => this.pickerMachineHandler(null)}
                      />
                    </View>
                    <View style={{ zIndex: 10, width: '100%' }}>
                      <CustomPicker
                        type="Mix"
                        data={data.spray_mixes}
                        key={2}
                        styles={{zIndex: 500}}
                        handleSelect={this.pickerMixHandler}
                        index={2}
                        allowOpen={this.state.selectedPicker === 2 ? true : false}
                        handleSelectedPicker={this.handleSelectedPicker}
                        handleRemoveItem={() => this.pickerMixHandler(null)}
                      />
                    </View>
                  </Task>
                )
              }
            </View>
          </View>
        </ScrollView>
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
        {
          (selectedMachine && selectedMix) && (
            <SlidingButton
              title={'Select Paddocks'}
              label={'Swipe Right to Complete'}
              onSuccess={() => this.selectPaddocks()}
              />
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setTask: task => dispatch(actions.setTask(task)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyTask);
