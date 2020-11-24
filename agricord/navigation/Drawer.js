import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Slider from 'components/Slider/WithIcons.js';
import { Color, BasicStyles } from 'common';
import Homepage from 'modules/basics/Welcome.js';
import Dashboard from 'modules/basics/Welcome.js';
import Notification from 'modules/basics/Welcome.js';
import Profile from 'modules/basics/Welcome.js';
import HelpCenter from 'modules/basics/Welcome.js';
import OptionRight from './OptionRight';
import TermsAndConditions from 'modules/basics/Welcome.js';
import PrivacyPolicy from 'modules/basics/Welcome.js';
import Merchant from 'modules/basics/Welcome.js';;
import MyAddress from 'modules/basics/Welcome.js';
import Settings from 'modules/basics/Welcome.js';
import Referral from 'modules/basics/Welcome.js';
import MyOrders from 'modules/basics/Welcome.js';
import MyOrderDetails from 'modules/basics/Welcome.js';;
import MessengerMessages from 'modules/basics/Welcome.js';
import { connect } from 'react-redux';

class MenuDrawerContentStructure extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginState: true
    };
  }
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    const { theme } = this.props.state;
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.state.loginState === true && 
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <FontAwesomeIcon icon={ faBars } size={BasicStyles.iconSize} style={[BasicStyles.iconStyle, {
              color: theme ? theme.primary : Color.primary
            }]}/>
          </TouchableOpacity>
        }
        
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setActiveRoute: (route) => dispatch(actions.setActiveRoute(route))
  };
};

let MenuDrawerStructure = connect(mapStateToProps, mapDispatchToProps)(MenuDrawerContentStructure);
 
const Homepage_StackNavigator = createStackNavigator({
  Homepage: {
    screen: Homepage,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const Drawer = createDrawerNavigator({
  Homepage: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
}, {
  contentComponent: Slider
});

export default Drawer;