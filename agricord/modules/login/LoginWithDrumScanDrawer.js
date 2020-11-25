import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Color, BasicStyles} from 'common';
import {connect} from 'react-redux';
import DrumScanLogin from 'modules/login/DrumScanLogin';

// class HeaderOptions extends Component {
//   constructor(props) {
//     super(props);
//   }
//   back = () => {
//     this.props.navigationProps.navigate('drawerStack');
//   };
//   render() {
//     return <View style={{flexDirection: 'row'}}></View>;
//   }
// }

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
  };
};

const DrumScanLoginStack = createStackNavigator({
  drumScanLoginScreen: {
    screen: DrumScanLogin,
    navigationOptions: ({navigation}) => ({}),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrumScanLoginStack);
