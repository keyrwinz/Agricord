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
        {this.state.quantity > parseInt(this.props.quantity) && (
          <Text style={{
            alignItems: 'center',
            textAlign: 'center',
            color: 'red',
            marginBottom: 5
          }}>Ooops. Quantity should be less than or equal to original product quantity ({this.props.quantity}).</Text>
        )}
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
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}>
        <RNSlidingButton
          style={{
            width: '100%',
            borderRadius: BasicStyles.standardBorderRadius,
            backgroundColor: Color.white,
            zIndex: 0,
          }}
          height={52}
          onSlidingSuccess={() => {
            this.props.onComplete()
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
            {this.state.quantity > 0 && this.state.quantity <= parseInt(this.props.quantity) && (
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
            </View>)}
          </View>
        </RNSlidingButton>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            left: 50,
            width: 230,
            height: 52,
            position: 'absolute'
          }}>
          <TextInput
            value={this.state.quantity}
            style={{
              width: 100,
              height: 50,
              color: this.state.quantity > parseInt(this.props.quantity) ? 'red' : 'black',
            }}
            keyboardType='numeric'
            placeholder={'Type quantity...'}
            onChangeText={text => this.changeText(text)}>
          </TextInput>
        </View>
      </View>
      {this.state.quantity > 0 && this.state.quantity <= parseInt(this.props.quantity) && (<Text
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
    </Text>)}
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
