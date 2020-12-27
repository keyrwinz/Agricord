import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ProductDetails from 'modules/product/ProductDetails.js';
import { Color, BasicStyles } from 'common';
import { connect } from 'react-redux';

class HeaderOptions extends Component {
  constructor(props){
    super(props);
  }
  back = () => {
    this.props.navigationProps.pop();
    // console.log(this.props)
    };
  render() {
    const { data } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.back.bind(this)}>
          {/*Donute Button Image */}
          <FontAwesomeIcon icon={ faChevronLeft } size={BasicStyles.iconSize} style={[BasicStyles.iconStyle,{color:'black'}]}/>
        </TouchableOpacity>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
          {data.title}
        </Text>
        <Text style={{ color: '#81CB9C', marginLeft: 7, fontSize: 16 }}>
          ({data.volume ? data.volume : '100L'})
        </Text>
      </View>
    );
  }
}

class HeaderTitle extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
          {data.product_title}
        </Text>
        <Text style={{ color: '#81CB9C', marginLeft: 7, fontSize: 16 }}>
          {data.volume ? data.volume : '100L'}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    logout: () => dispatch(actions.logout())
  };
};

const ProductDetailsDrawerStack = createStackNavigator({
  MixNameScreen: {
    screen: ProductDetails, 
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderOptions navigationProps={navigation} data={navigation.state.params.data} />,
      drawerLabel: 'Paddock',
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerTintColor: 'black',
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsDrawerStack);