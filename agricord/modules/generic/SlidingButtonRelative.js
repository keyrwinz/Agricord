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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';

const height = Math.round(Dimensions.get('window').height);

class SlidingButtonRelative extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: Color.white,
          ...this.props.style
        }}>
        <RNSlidingButton
          style={{
            marginTop: 5,
            width: '90%',
            borderRadius: BasicStyles.standardBorderRadius,
            backgroundColor: Color.white,
            borderColor: Color.gray,
            borderWidth: 1,
            zIndex: 0,
          }}
          height={45}
          onSlidingSuccess={() => {
            this.props.onComplete();
          }}
          slideDirection={SlideDirection.RIGHT}>
          <View
            style={{
              width: '100%',
              borderRadius: BasicStyles.standardBorderRadius,
              backgroundColor: Color.white,
              zIndex: 0,
              flexDirection: 'row'
            }}
            height={45}
            onSlidingSuccess={() => {
              this.props.onComplete();
            }}
            slideDirection={SlideDirection.RIGHT}>
            <View
              style={{
                backgroundColor: Color.blue,
                height: 45,
                width: this.props.widthLeft,
                borderRadius: BasicStyles.standardBorderRadius,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {
                this.props.icon ? (
                  <FontAwesomeIcon icon={this.props.icon} color={Color.white}/>
                ) : (
                  <Text
                    style={{
                      color: Color.white,
                      fontSize: BasicStyles.standardTitleFontSize,
                      fontWeight: 'bold'
                    }}>
                    {this.props.buttonTitle}
                  </Text>

                )
              }
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: this.props.widthRight
              }}>
              <Text
                style={{
                  fontSize: BasicStyles.standardTitleFontSize,
                  fontWeight: 'bold',
                  color: '#5A84EE',
                }}>
                {this.props.title}
              </Text>
            </View>
          </View>
        </RNSlidingButton>
        <Text
          style={{
            fontSize: BasicStyles.standardFontSize - 1,
            color: '#969696',
            textAlign: 'left',
            width: '80%',
            marginLeft: '10%',
            marginRight: '10%',
            marginBottom: 20
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
)(SlidingButtonRelative);
