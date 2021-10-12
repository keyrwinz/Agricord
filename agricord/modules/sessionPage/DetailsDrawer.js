import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Details from 'modules/sessionPage/Details.js';
import { BasicStyles } from 'common';
import { connect } from 'react-redux';
const width = Math.round(Dimensions.get('window').width);
class HeaderOptions extends Component {
  constructor(props){
    super(props);
  }
  back = () => {
    this.props.navigationProps.pop();
  };
  render() {
    const { data } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={this.back.bind(this)}
          >
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

const DetailsStack = createStackNavigator({
  PaddockScren: {
    screen: Details, 
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params
      && navigation.state.params.data !== null ? navigation.state.params.data.session : '',
      headerLeft: <HeaderOptionsConnect navigationProps={navigation} />,
      ...BasicStyles.headerDrawerStyle
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsStack);