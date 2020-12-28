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
import {BasicStyles, Routes, Color} from 'common';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';

const height = Math.round(Dimensions.get('window').height);

class SlidingButton extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={{
          width: '100%',
          alignItems: 'center',
          zIndex: 100,
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: Color.containerBackground,
        }}>
        <RNSlidingButton
          style={{
            marginTop: 5,
            width: '90%',
            borderRadius: BasicStyles.standardBorderRadius,
            backgroundColor: Color.containerBackground,
            borderColor: Color.gray,
            borderWidth: 1,
            zIndex: 0,
          }}
          height={45}
          onSlidingSuccess={() => {
            this.props.onSuccess();
          }}
          slideDirection={SlideDirection.RIGHT}>
          <View
            style={{
              width: '100%',
              borderRadius: BasicStyles.standardBorderRadius,
              backgroundColor: Color.containerBackground,
              zIndex: 0,
            }}
            height={45}
            onSlidingSuccess={() => {
              this.props.onSuccess();
            }}
            slideDirection={SlideDirection.RIGHT}>
            <View
              style={{
                backgroundColor: Color.blue,
                height: 45,
                width: '50%',
                borderRadius: BasicStyles.standardBorderRadius,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: BasicStyles.titleText.fontSize,
                  fontWeight: 'bold',
                }}>
                {this.props.title}
              </Text>
            </View>
          </View>
        </RNSlidingButton>
         <Text
          style={{
            fontSize: BasicStyles.normalText.fontSize,
            color: '#969696',
            textAlign: 'left',
            width: '80%',
            marginLeft: '10%',
            marginRight: '10%'
          }}>
          {this.props.label}
        </Text>
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
)(SlidingButton);
