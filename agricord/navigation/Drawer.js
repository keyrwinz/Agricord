import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Slider from 'modules/slider';
import {Color, BasicStyles} from 'common';
import Homepage from 'modules/homepage';
import OptionRight from './OptionRight';
import {connect} from 'react-redux';

const width = Math.round(Dimensions.get('window').width);

class MenuDrawerContentStructure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: true,
    };
  }
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    const {theme} = this.props.state;
    const {color} = this.props;
    return (
      <View style={{flexDirection: 'row'}}>
        {this.state.loginState === true && (
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <FontAwesomeIcon
              icon={faBars}
              size={BasicStyles.iconSize}
              style={[
                BasicStyles.iconStyle,
                {
                  color: color ? color : theme ? theme.primary : Color.primary,
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setActiveRoute: route => dispatch(actions.setActiveRoute(route)),
  };
};

let MenuDrawerStructure = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuDrawerContentStructure);

const Homepage_StackNavigator = createStackNavigator({
  Homepage: {
    screen: Homepage,
    navigationOptions: ({navigation}) => {
      console.log({navigation});
      return {
        headerShown: false,
      };
    },
  },
  //=================ORDERS ROUTES========================//
  UpcomingOrders: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'OrdersPage'},
  },
  HistoricalOrders: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'OrdersPage'},
  },

  //==========================INVENTORY ROUTES===================//
  InventoryHerbicides: {
    screen: Homepage,
    navigationOptions: () => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'InventoryPage'},
  },
  InventoryFungicides: {
    screen: Homepage,
    navigationOptions: () => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'InventoryPage'},
  },
  InventoryInsecticides: {
    screen: Homepage,
    navigationOptions: () => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'InventoryPage'},
  },
  InventoryOther: {
    screen: Homepage,
    navigationOptions: () => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'InventoryPage'},
  },

  //==========================TASKS ROUTES===================//
  TasksInProgress: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'OrdersPage'},
  },
  TasksDue: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'OrdersPage'},
  },
  TasksHistory: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'OrdersPage'},
  },

  //==========================SETTINGS ROUTES===================//
  AccountSettings: {
    screen: Homepage,
    navigationOptions: () => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'SettingsPage'},
  },
  AppSettings: {
    screen: Homepage,
    navigationOptions: () => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'SettingsPage'},
  },
  //============================================================//
});

const Drawer = createDrawerNavigator(
  {
    Homepage: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    Dashboard: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    //ROUTES FOR ORDERS
    UpcomingOrders: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    HistoricalOrders: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    ///////////////////

    //ROUTES FOR INVENTORIES
    InventoryHerbicides: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    InventoryFungicides: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    InventoryInsecticides: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    InventoryOther: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    ///////////////////

    // ROUTES FOR TASKS
    TasksInProgress: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },

    TasksDue: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },

    TasksHistory: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },

    Task: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    ///////////////////

    // ROUTES FOR SETTINGS
    AccountSettings: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    AppSettings: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
  },
  {
    contentComponent: Slider,
    drawerWidth: width,
    initialRouteName: 'Homepage',
  },
);

export default Drawer;
