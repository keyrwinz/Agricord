import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import BatchPage from 'modules/manualBatchPage';
import { BasicStyles } from 'common';
import { connect } from 'react-redux';

class HeaderOptions extends Component {
  constructor(props) {
    super(props);
  }

  back = () => {
    Alert.alert(
      "Note",
      "Data from previous page will be reset once you click 'Okay'",
      [
        { text: "Okay", onPress: () => { this.props.navigationProps.navigate('mixPageStack') } }
      ],
      { cancelable: false }
    );
  };


render() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={this.back.bind(this)}>
        {/*Donute Button Image */}
        <FontAwesomeIcon icon={faChevronLeft} size={BasicStyles.iconSize} style={[BasicStyles.iconStyle, { color: "#BABABA" }]} />
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

const manualBatchStack = createStackNavigator({
  ManualBatchScreen: {
    screen: BatchPage, 
    navigationOptions: ({ navigation }) => ({
      title: 'MANUAL BATCH',
      headerLeft: <HeaderOptions navigationProps={navigation} />,
      ...BasicStyles.headerDrawerStyle
    })
  }
})

export default connect(
  mapDispatchToProps
)(manualBatchStack);