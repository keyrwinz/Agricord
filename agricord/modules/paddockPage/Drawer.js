import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PaddockPage from 'modules/paddockPage';
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
          <FontAwesomeIcon icon={ faChevronLeft } size={BasicStyles.iconSize} style={[BasicStyles.iconStyle,{color:'black'}]}/>
        </TouchableOpacity>
      </View>
    );
  }
}


const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    logout: () => dispatch(actions.logout())
  };
};

let HeaderOptionsConnect = connect(mapStateToProps, mapDispatchToProps)(HeaderOptions);

const PaddockStack = createStackNavigator({
  PaddockScren: {
    screen: PaddockPage, 
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.paddock ? navigation.state.params.paddock.name : '',
      headerLeft: <HeaderOptionsConnect navigationProps={navigation} />,
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
)(PaddockStack);