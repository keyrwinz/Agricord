import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ProductDetails from 'modules/product/ProductDetails.js';
import { Color, BasicStyles } from 'common';
import { connect } from 'react-redux';
const width = Math.round(Dimensions.get('window').width);
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
          <FontAwesomeIcon icon={ faChevronLeft } size={BasicStyles.iconSize} style={[BasicStyles.iconStyle,{color: "#BABABA"}]}/>
        </TouchableOpacity>
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
      headerTitle: () => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            paddingLeft: 64 / 2,
            marginLeft: -64,
            flexDirection: 'row'
          }}>
          <Text style={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: BasicStyles.standardHeaderFontSize
          }}
          numberOfLines={1}
          >
            {navigation.state.params.data ? navigation.state.params.data.title : ''}
          </Text>
          <Text style={{ color: '#81CB9C', marginLeft: 7, fontSize: BasicStyles.standardHeaderFontSize }}>
            ({navigation.state.params.data.volume ? navigation.state.params.data.volume : '100L'})
          </Text>
        </View>
      ),
      headerLeft: <HeaderOptions navigationProps={navigation} data={navigation.state.params.data} />,
      ...BasicStyles.headerDrawerStyleNoPadding
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsDrawerStack);