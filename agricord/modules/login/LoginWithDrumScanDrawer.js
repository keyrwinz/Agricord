import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Color, BasicStyles} from 'common';
import {connect} from 'react-redux';
import DrumScanLogin from 'modules/login/DrumScanLogin';

class HeaderOptions extends Component {
  constructor(props) {
    super(props);
  }
  back = () => {
    this.props.navigationProps.pop();
  };
  render() {
    return (
      <View style={{flexDirection: 'row', paddingLeft: 20}}>
        <TouchableOpacity onPress={this.back.bind(this)}>
          {/*Donute Button Image */}
          <FontAwesomeIcon
            color="#BABABA"
            icon={faChevronLeft}
            size={25}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
  };
};

const DrumScanLoginStack = createStackNavigator({
  drumScanLoginScreen: {
    screen: DrumScanLogin,
    navigationOptions: ({navigation}) => ({
      headerLeft: <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        elevation: 0,
        paddingTop: 20,
        backgroundColor: '#FFFFFF',
      },
      headerTintColor: BasicStyles.headerTintColor,
      headerTitleContainerStyle: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '18%',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  },
});

const styles = StyleSheet.create({
  iconStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrumScanLoginStack);
