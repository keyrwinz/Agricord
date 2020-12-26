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
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Divider } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Pagination from 'components/Pagination';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import InProgress from './InProgress'
import Due from './Due'
import History from './History'
import PaddockCard from 'components/Products/paddockCard.js'
import {products} from './data-test.js';
import TitleLogo from 'assets/inventory/title_logo.svg';
import TaskButton from 'modules/generic/TaskButton.js';


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
    if (user != null) {
    }
   console.log(Routes.tasksRetrieve)
    console.log("henlo",this.props)
    if (this.props.initialPage!=null) {
      switch(this.props.initialPage) {
        case 'TasksInProgress':
          this.setState({activeIndex:0})
          break;
        
        case 'TasksDue':
          this.setState({activeIndex:1})
          break;
    
        case 'TasksHistory':
          this.setState({activeIndex:2})
          break;
        default:
          console.log("Route does not exist")
      
      }
    }
  }
    


 
  render() {
    const { activeIndex } = this.state;
    const paginationProps=[
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
    const progress= products.filter(product=>{return product.status=="inprogress"});
    const due=products.filter(product=>{return product.status=="due"});
    const completed=products.filter(product=>{return product.status=="completed"});
    const onPageChange = (activeIndex) => this.setState({ activeIndex })
    return (
      <View style={Style.MainContainer}>
        {console.log(progress)}
        <View style={{backgroundColor:Color.white,height:50}}>
        <Pagination
          activeIndex={activeIndex}
          onChange={(index) => onPageChange(index)}
          pages={paginationProps}
        >
        </Pagination>
        </View>
        <PagerProvider activeIndex={activeIndex}>
          <Pager panProps={{enabled: false}}>
            <View style={Style.sliderContainer}>
              <InProgress {...this.props} data={progress} />
            </View>
            <View style={Style.sliderContainer}>
              <Due {...this.props} data={due}/>
            </View>
            <View style={Style.sliderContainer}>
              <History {...this.props} data={completed}/>
            </View>
          </Pager>
        </PagerProvider>
        <TaskButton navigation={this.props.parentNav}/>
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
