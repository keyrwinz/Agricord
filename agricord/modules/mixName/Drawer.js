import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MixName from 'modules/mixName';
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
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.back.bind(this)}>
          {/*Donute Button Image */}
          <FontAwesomeIcon icon={ faChevronLeft } size={BasicStyles.iconSize} style={[BasicStyles.iconStyle,{color:'black'}]}/>
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

const MixNameStack = createStackNavigator({
  MixNameScreen: {
    screen: MixName, 
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.dataFrom==="inprogress" ? "MIX NAME" : "SPRAY MIX",
      headerLeft: <HeaderOptions navigationProps={navigation} />,
      drawerLabel: 'Paddock',
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerTintColor: 'black',
    })
  }
})

export default connect(
  
  mapDispatchToProps
)(MixNameStack);