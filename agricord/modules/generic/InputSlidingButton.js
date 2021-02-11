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

class InputSlidingButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      quantity: null
    }
  }
  changeText = (value) => {
    this.setState({quantity: value})
    this.props.changeText(value);
  }
  render(){
    return (
      <View>
      <View style={{
          width: '90%',
          alignItems: 'center',
          backgroundColor: Color.white,
          ...this.props.style,
          flexDirection: 'row',
          borderColor: Color.gray,
          borderWidth: 1,
          marginLeft: 20,
          borderRadius: BasicStyles.standardBorderRadius,
        }}>
        <RNSlidingButton
          style={{
            width: '65%',
            borderRadius: BasicStyles.standardBorderRadius,
            backgroundColor: Color.white,
            zIndex: 0,
          }}
          height={52}
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
            height={52}
            onSlidingSuccess={() => {
              this.props.onComplete();
            }}
            slideDirection={SlideDirection.RIGHT}>
            <View
              style={{
                backgroundColor: Color.blue,
                height: 52,
                width: 100,
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
          </View>
        </RNSlidingButton>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 230,
            height: 52,
          }}>
          <TextInput
            value={this.state.quantity}
            style={{
              width: 300,
              height: 50,
            }}
            keyboardType='numeric'
            onChangeText={text => this.changeText(text)}>
          </TextInput>
        </View>
      </View>
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
)(InputSlidingButton);
