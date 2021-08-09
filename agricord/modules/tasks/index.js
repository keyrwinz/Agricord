import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import Api from 'services/api/index.js'
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner } from 'components';
import { Divider } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Pagination from 'components/Pagination/GradientBorder';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import TasksList from './TasksList.js'
import {products} from './data-test.js';
import TitleLogo from 'assets/inventory/title_logo.svg';
import TaskButton from 'modules/generic/TaskButton.js';
import _ from 'lodash';


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      isLoading: false,
      label: 'inprogress',
      limit: 5,
      offset: 0,
      numberOfPages: null
    };   
  }
  

  async componentDidMount(){
    const { user } = this.props.state;
    if (user == null) {
      return
    }
    await this.setState({
      activeIndex: this.props.parentNav.state && this.props.parentNav.state.params ? this.props.parentNav.state.params.index : 0
    })
    // if (this.props.initialPage != null) {
    //   if (this.props.initialPage == 'TasksInProgress') {
    //     this.setState({activeIndex: 0});
    //   }
    // }else{
    //   this.setState({activeIndex: 0, label: 'inprogress'})
    // }
    // if (this.props.parentNav.state.params && this.props.parentNav.state.params.route != null) {
    //   switch(this.props.parentNav.state.params.route) {
    //     case 'TasksInProgress':
    //       this.setState({activeIndex: 0})
    //       break;
        
    //     case 'TasksDue':
    //       this.setState({activeIndex: 1})
    //       break;
    
    //     case 'TasksHistory':
    //       this.setState({activeIndex: 2})
    //       break;
    //     default:
    //       console.log("Route does not exist")
    //   }
    // }else{
    //   this.setState({activeIndex: 0, label: 'inprogress'})
    // }
    this.retrieve(true)
  }

  retrieve = (flag) => {
    const { user } = this.props.state;
    const { activeIndex } = this.state;
    this.setState({
      isLoading: true,
    });
    const parameter = {
      condition: [{
        value: user.sub_account.merchant.id,
        column: 'merchant_id',
        clause: '='
      }, {
        value: this.getStatusValue(activeIndex),
        clause: '=',
        column: 'status'
      }],
      limit: this.state.limit,
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
      sort: {
        due_date: 'desc'
      }
    };
    if(activeIndex == 1){
      console.log('parameter', Routes.paddockDueTaskRetrieve, parameter)
      Api.request(Routes.paddockDueTaskRetrieve, parameter, response => {
        console.log('--------------', parameter);
          this.setState({
            isLoading: false
          });
          if(response.data && response.data.length > 0){
            this.setState({
              data: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id'),
              numberOfPages: parseInt(response.size / this.state.limit) + (response.size % this.state.limit ? 1 : 0),
              offset: flag == false ? 1 : (this.state.offset + 1)
            })
          }else{
            this.setState({
              data: flag == false ? [] : this.state.data,
              numberOfPages: null,
              offset: flag == false ? 0 : this.state.offset
            })
          }
        }, error => {
          this.setState({isLoading: false});
          console.log('ERROR HAPPENS', error);
        },
      );
    }else{
      console.log('PARAMETER:',Routes.paddockPlanTasksRetrieveEndUser, parameter);
    Api.request(Routes.paddockPlanTasksRetrieveEndUser, parameter, response => {
        this.setState({
          isLoading: false
        });
        if(response.data && response.data.length > 0){
          this.setState({
            data: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id'),
            numberOfPages: parseInt(response.size / this.state.limit) + (response.size % this.state.limit ? 1 : 0),
            offset: flag == false ? 1 : (this.state.offset + 1)
          })
        }else{
          this.setState({
            data: flag == false ? [] : this.state.data,
            numberOfPages: null,
            offset: flag == false ? 0 : this.state.offset
          })
        }
      }, error => {
        this.setState({isLoading: false});
        console.log('ERROR HAPPENS', error);
      },
    );
    }
  };

  getStatusValue(index){
    switch(index){
      case 0: return 'inprogress';
      case 1: return 'approved';
      case 2: return 'completed';
    }
  }

  getLabel(index){
    switch(index){
      case 0: return 'inprogress';
      case 1: return 'due';
      case 2: return 'history';
    }
  }

  onPageChange(index){
    this.setState({
      activeIndex: index,
      data: [],
      label: this.getLabel(index),
      offset:0
    })
    setTimeout(() => {
      this.retrieve(true)
    }, 100)
  }
 
  render() {
    const { activeIndex, data, label, isLoading } = this.state;
    const paginationProps = [
      {
        name:'In Progress'
      },
      {
        name:'Due',
      },
      {
        name:"History",
      }
    ]

    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
      }]}>
        <View style={BasicStyles.paginationHolder}>
          <Pagination
            activeIndex={activeIndex}
            onChange={(index) => this.onPageChange(index)}
            pages={paginationProps}
          />
        </View>
        <PagerProvider activeIndex={activeIndex}>
          <Pager panProps={{enabled: false}}>
            <View style={Style.sliderContainer}>
              <TasksList navigation={this.props.parentNav} data={data} from={label} loading={isLoading} retrieve={(flag) => this.retrieve(flag)}/>
            </View>
            <View style={Style.sliderContainer}>
              <TasksList navigation={this.props.parentNav} data={data} from={label} loading={isLoading} retrieve={(flag) => this.retrieve(flag)}/>
            </View>
            <View style={Style.sliderContainer}>
              <TasksList navigation={this.props.parentNav} data={data} from={label} loading={isLoading} retrieve={(flag) => this.retrieve(flag)}/>
            </View>
          </Pager>
        </PagerProvider>
        <TaskButton navigation={this.props.parentNav}/>
        {isLoading ? <Spinner mode="overlay" /> : null}
      </View>
    );
  }
}
const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksPage);
