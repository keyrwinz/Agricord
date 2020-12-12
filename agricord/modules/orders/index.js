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
import Pagination from 'components/Pagination';
import {Pager, PagerProvider} from '@crowdlinker/react-native-pager';
import Orders from './Orders';
import {products} from './data-test.js';
import Api from 'services/api';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      pending: [],
      delivered: [],
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
      this.getOrders('pending');
      this.getOrders('completed');
    }
  }

  getOrders = value => {
    let parameters = {
      condition: [
        {
          value: value,
          clause: '=',
          column: 'status',
        },
      ],
      status: value,
    };
    Api.request(Routes.ordersRetrieve, parameters, response => {
      this.setData(response.data, value);
    });
  };

  setData = (data, type) => {
    switch (type) {
      case 'pending':
        this.setState({pending: data}, () => {
          console.log('PENDING', this.state.pending);
        });
        break;
      case 'completed':
        this.setState({delivered: data});
        break;
      default:
        break;
    }
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
    const pending = products.filter(product => {
      return product.status == 'pending';
    });
    const delivered = products.filter(product => {
      return product.status == 'delivered';
    });
    const onPageChange = activeIndex => this.setState({activeIndex});
    return (
      <View style={Style.MainContainer}>
        <Pagination
          activeIndex={activeIndex}
          onChange={index => onPageChange(index)}
          pages={paginationProps}
        />
        <PagerProvider activeIndex={activeIndex}>
          <Pager panProps={{enabled: false}}>
            <View style={Style.sliderContainer}>
              <Orders {...this.props} data={this.state.pending} />
            </View>
            <View style={Style.sliderContainer}>
              <Orders {...this.props} data={this.state.delivered} />
            </View>
          </Pager>
        </PagerProvider>
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
