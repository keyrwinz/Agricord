import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MixName from 'modules/mixName';
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
      title: navigation.state.params ? 'Mix Name' : '',
      // headerTitle: () => (
      //   <View
      //     style={{
      //       alignItems: 'center',
      //       justifyContent: 'center',
      //       width: width,
      //       marginLeft: -64
      //     }}>
      //     <Text
      //       style={{
      //         color: '#000',
      //         marginLeft: 7,
      //         fontWeight: 'bold',
      //         fontSize: 20
      //       }}>
      //       {navigation.state.params ? 'Mix Name' : ''}
      //     </Text>
      //   </View>
      // ),
      headerLeft: <HeaderOptions navigationProps={navigation} />,
      ...BasicStyles.headerDrawerStyle
    })
  }
})

export default connect(
  
  mapDispatchToProps
)(MixNameStack);