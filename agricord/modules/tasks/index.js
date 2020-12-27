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


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: null,
      isLoading: false,
      label: 'inprogress'
    };   
  }
  

  componentDidMount(){
    const { user } = this.props.state;
    if (user == null) {
      return
    }
    if (this.props.parentNav.state.params && this.props.parentNav.state.params.route != null) {
      switch(this.props.parentNav.state.params.route) {
        case 'TasksInProgress':
          this.setState({activeIndex: 0})
          break;
        
        case 'TasksDue':
          this.setState({activeIndex: 1})
          break;
    
        case 'TasksHistory':
          this.setState({activeIndex: 2})
          break;
        default:
          console.log("Route does not exist")
      }
    }else{
      this.setState({activeIndex: 0, label: 'inprogress'})
    }
    this.retrieveData()
  }

  retrieveData = () => {
    this.setState({
      isLoading: true,
    });

    const parameter = {
      status: 'Auto',
      offset: 0,
      limit: 10,
      merchant_id: 38,
    };

    Api.request(Routes.tasksRetrieve, parameter, response => {
        this.setState({data: response.data.paddocks, isLoading: false});
      }, error => {
        console.log('ERROR HAPPENS', error);
      },
    );
  };

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
      data: null,
      label: this.getLabel(index)
    })
    this.retrieveData()
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
      <View style={Style.MainContainer}>
        <View style={BasicStyles.paginationHolder}>
        <Pagination
          activeIndex={activeIndex}
          onChange={(index) => this.onPageChange(index)}
          pages={paginationProps}
        >
        </Pagination>
        </View>
        <PagerProvider activeIndex={activeIndex}>
          <Pager panProps={{enabled: false}}>
            <View style={Style.sliderContainer}>
              <TasksList navigation={this.props.parentNav} data={data} from={label} loading={isLoading}/>
            </View>
            <View style={Style.sliderContainer}>
              <TasksList navigation={this.props.parentNav} data={data} from={label} loading={isLoading}/>
            </View>
            <View style={Style.sliderContainer}>
              <TasksList navigation={this.props.parentNav} data={data} from={label} loading={isLoading}/>
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
)(Tasks);
