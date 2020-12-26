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

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class OrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      pending: [],
      delivered: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const {user} = this.props.state;
    if (user != null) {
    }
    if (this.props.initialPage != null) {
      if (this.props.initialPage == 'HistoricalOrders') {
        this.setState({activeIndex: 1});
      }
      this.getOrders();
    }
  }

  getOrders = () => {
    const {user} = this.props.state;
    this.setState({isLoading: true});
    // user.sub_account.merchant.id
    let parameters = {
      condition: [
        {
          column: 'merchant_id',
          value: 1, //temporarily used id of 1 because the current user.sub_account.merchant.id (4) causes API to returns null data
          clause: '=',
        },
      ],
    };
    Api.request(Routes.ordersRetrieveMerchant, parameters, response => {
      this.setState({isLoading: false});
      this.filterOrders(response.data);
    }, error => {
      this.setState({isLoading: false});
    });
  };

  filterOrders = orders => {
    this.setState({
      pending: orders.filter(order => {
        return order.status === 'pending' || order.status === 'in_progress';
      }),
    });
    this.setState({
      delivered: orders.filter(order => {
        return order.status === 'completed';
      }),
    });
  };

  render() {
    const {activeIndex} = this.state;
    const paginationProps = [
      {
        name: 'Pending',
      },
      {
        name: 'Delivered',
      },
    ];

    const onPageChange = activeIndex => this.setState({activeIndex});
    return (
      <View style={Style.MainContainer}>
        <View style={BasicStyles.paginationHolder}>
          <Pagination
            activeIndex={activeIndex}
            onChange={index => onPageChange(index)}
            pages={paginationProps}
          />
        </View>
        <PagerProvider activeIndex={activeIndex}>
          <Pager panProps={{enabled: false}}>
            <View style={Style.sliderContainer}>
              <Orders {...this.props} data={this.state.pending}/>
            </View>
            <View style={Style.sliderContainer}>
              <Orders {...this.props} data={this.state.delivered} />
            </View>
          </Pager>
        </PagerProvider>
        <TaskButton navigation={this.props.parentNav}/>
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
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
