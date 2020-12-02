import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CartCheckout from 'modules/paddockPage';
import { Color, BasicStyles } from 'common';
import { connect } from 'react-redux';

class HeaderOptions extends Component {
  constructor(props){
    super(props);
  }
  back = () => {
    this.props.navigationProps.pop();
  };
  goTo = () => {
    this.props.navigationProps.navigate('addressMap')
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.back.bind(this)}>
          {/*Donute Button Image */}
          <FontAwesomeIcon icon={ faChevronLeft } size={BasicStyles.iconSize} style={BasicStyles.iconStyle}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    logout: () => dispatch(actions.logout())
  };
};

const CartStack = createStackNavigator({
  CartScreen: {
    screen: CartCheckout, 
    navigationOptions: ({ navigation }) => ({
      title: 'Paddock',
      headerLeft: <HeaderOptions navigationProps={navigation} />,
      drawerLabel: 'Paddock',
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTintColor: '#fff',
    })
  }
})

export default connect(
  
  mapDispatchToProps
)(CartStack);