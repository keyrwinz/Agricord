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
import {accountInfo} from './data-test.js';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      permissionLevel: '',
    };
  }

  componentDidMount() {
    const {user} = this.props.state;
    if (user != null) {
      this.setState({
        name: `${user.account_information.first_name} ${
          user.account_information.last_name
        }`,
        permissionLevel: user.sub_account.status,
      });
    }
  }

  render() {
    return (
      <View style={{alignItems: 'center', width: '100%', height: '100%'}}>
        <View style={Style.productInfoContainer}>
          <View style={Style.cardInfo}>
            <View style={Style.HeadingContainer}>
              <Image
                style={Style.ImageStyle}
                source={require('../../assets/nameIcon.png')}
              />
              <Text style={Style.HeadingTextStyle}>Name</Text>
            </View>
            <View style={Style.DescriptionContainer}>
              <Text style={Style.DescriptionTextStyle}>{this.state.name}</Text>
            </View>
          </View>
          <Divider style={{height: 0.5, marginLeft: 10, marginRight: 10}} />
          <View style={Style.cardInfo}>
            <View style={Style.HeadingContainer}>
              <Image
                style={Style.ImageStyle}
                source={require('../../assets/businessAccountIcon.png')}
              />
              <Text style={Style.HeadingTextStyle}>Business Account</Text>
            </View>
            <View style={Style.DescriptionContainer}>
              <Text style={Style.DescriptionTextStyle}>Agricord. Inc</Text>
            </View>
          </View>
          <Divider style={{height: 0.5, marginLeft: 10, marginRight: 10}} />
          <View style={Style.cardInfo}>
            <View style={Style.HeadingContainer}>
              <Image
                style={Style.ImageStyle}
                source={require('../../assets/permissionIcon.png')}
              />
              <Text style={Style.HeadingTextStyle}>Permissions Level</Text>
            </View>
            <View style={Style.DescriptionContainer}>
              <Text style={Style.DescriptionTextStyle}>
                {this.state.permissionLevel}
              </Text>
            </View>
          </View>
          <Divider style={{height: 0.5, marginLeft: 10, marginRight: 10}} />
          <View style={Style.cardInfo}>
            <View style={Style.HeadingContainer}>
              <Image
                style={Style.ImageStyle}
                source={require('../../assets/lastLoginIcon.png')}
              />
              <Text style={Style.HeadingTextStyle}>Last Login</Text>
            </View>
            <View style={Style.DescriptionContainer}>
              <Text style={Style.DescriptionTextStyle}>22 October 2020</Text>
            </View>
          </View>
          <Divider style={{height: 0.5, marginLeft: 10, marginRight: 10}} />
        </View>
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
