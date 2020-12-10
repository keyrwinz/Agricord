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
import {NavigationActions} from 'react-navigation';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import {connect} from 'react-redux';
import {
  faUserCircle,
  faMapMarker,
  faUniversity,
  faKaaba,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import {Routes, Color, Helper, BasicStyles} from 'common';
import {Spinner, Empty, SystemNotification} from 'components';
import {
  MainCard,
  Feature,
  Card,
  MainFeature,
  PromoCard,
} from 'components/ProductThumbnail';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {Divider} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Pagination from 'components/Pagination';
import {Pager, PagerProvider} from '@crowdlinker/react-native-pager';
import Orders from './Orders';
import PaddockCard from 'components/Products/paddockCard.js';
import {products} from './data-test.js';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
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
    }
  }

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
              <Orders {...this.props} data={pending} />
            </View>
            <View style={Style.sliderContainer}>
              <Orders {...this.props} data={delivered} />
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
