import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import {Routes, Color, Helper, BasicStyles} from 'common';
import Pagination from 'components/Pagination/GradientBorder';
import {Pager, PagerProvider} from '@crowdlinker/react-native-pager';
import Orders from './Orders';
import {products} from './data-test.js';
import Api from 'services/api';
import {Spinner} from 'components';
import TaskButton from 'modules/generic/TaskButton.js';
import _ from 'lodash';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class OrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      isLoading: false,
      limit: 5,
      offset: 0,
      numberOfPages: null
    };
  }

  componentDidMount() {
    const {user} = this.props.state;
    this.setState({
      activeIndex: this.props.parentNav.state && this.props.parentNav.state.params ? this.props.parentNav.state.params.index : 0
    })
    if(user == null){
      return
    }
    this.retrieve(true);
  }

  retrieve = (flag) => {
    const {user} = this.props.state;
    const { activeIndex } = this.state;
    if(user == null){
      return
    }

    this.setState({
      isLoading: true
    });

    let parameters = {
      condition: [{
          column: 'merchant_id',
          value: 1, //temporarily used id of 1 because the current user.sub_account.merchant.id (4) causes API to returns null data
          clause: '=',
        }, {
          column: 'status',
          value: 'completed',
          clause: activeIndex == 0 ? '!=' : '='
        }
      ],
      sort: {
        created_at: 'desc'
      },
      limit: this.state.limit,
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
    };

    Api.request(Routes.ordersRetrieveByParams, parameters, response => {
      this.setState({
        isLoading: false
      });
      console.log('response', response.data)
      if(response.data.length > 0){
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
      this.setState({
        isLoading: false
      });
    });
  };

  onPageChange = (index) => {
    this.setState({activeIndex: index, offset: 0, data: []});
    setTimeout(() => {
      this.retrieve(true);
    }, 100)
  }


  render() {
    const { activeIndex , data, isLoading } = this.state;
    const paginationProps = [
      {
        name: 'Pending',
      },
      {
        name: 'Delivered',
      },
    ];

    return (
      <View style={Style.MainContainer}>
        <View style={BasicStyles.paginationHolder}>
          <Pagination
            activeIndex={activeIndex}
            onChange={index => this.onPageChange(index)}
            pages={paginationProps}
          />
        </View>
        <PagerProvider activeIndex={activeIndex}>
          <Pager panProps={{enabled: false}}>
            <View style={Style.sliderContainer}>
              <Orders {...this.props} data={data} from={'pending'} loading={isLoading} retrieve={(flag) => this.retrieve(flag)}/>
            </View>
            <View style={Style.sliderContainer}>
              <Orders {...this.props} data={data} from={'delivered'} loading={isLoading} retrieve={(flag) => this.retrieve(flag)}/>
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
)(OrdersPage);
