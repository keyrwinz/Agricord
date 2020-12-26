import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert
} from 'react-native';
import { connect } from 'react-redux';

const height = Math.round(Dimensions.get('window').height);

class TaskButton extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'flex-end'
          }}
        >
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('applyTaskStack')
          }}>
            <Image
              style={{
                padding: 30,
                height: 50,
                width:'100%'
              }}
              source={require('assets/taskIcon.png')}
            />
          </TouchableOpacity>
        </View>
    );
  }
}
const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskButton);
