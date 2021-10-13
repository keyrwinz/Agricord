import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import UnallocatedBatch from 'modules/unallocatedBatch';
import { BasicStyles } from 'common';
import { connect } from 'react-redux';

class HeaderOptions extends Component {
  constructor(props){
    super(props);
  }
  back = () => {
    this.props.navigationProps.pop();
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

const UnallocatedBatchStack = createStackNavigator({
  UnallocatedBatchScreen: {
    screen: UnallocatedBatch, 
    navigationOptions: ({navigation}) => ({
      title: 'MANUAL BATCH',
      headerLeft: <HeaderOptions navigationProps={navigation} />,
      ...BasicStyles.headerDrawerStyle
    }),
  }
})

export default connect(
  
  mapDispatchToProps
)(UnallocatedBatchStack);