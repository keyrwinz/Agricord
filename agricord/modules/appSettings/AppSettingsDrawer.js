import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Color, BasicStyles} from 'common';
import {connect} from 'react-redux';
import AppSettings from 'modules/appSettings';

class HeaderOptions extends Component {
  constructor(props) {
    super(props);
  }
  back = () => {
    this.props.navigationProps.navigate('drawerStack');
  };
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            this.back();
          }}
          style={{
            width: '16.5%',
            alignItems: 'center',
            marginLeft: '0.5%',
          }}>
          {/*Donute Button Image */}
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={30}
            style={{color: '#3F0050'}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
  };
};

const AppSettingsStack = createStackNavigator({
  appSettingsScreen: {
    screen: AppSettings,
    navigationOptions: ({navigation}) => ({
      title: 'App Settings',
      drawerLabel: 'App Settings',
      headerLeft: <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
        height: 80,
        elevation: 0,
      },
      headerTintColor: '#4c4c4c',
      headerTitleStyle: {
        fontSize: 20,
      },
    }),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsStack);
