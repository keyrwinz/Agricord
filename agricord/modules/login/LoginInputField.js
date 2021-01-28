import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet, Platform} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styles from 'modules/login/Styles.js';

class LoginInputField extends Component {
  render() {
    return (
      <View style={styles.InputContainer}>
        <View style={styles.IconContainer}>
          <FontAwesomeIcon icon={this.props.icon} style={styles.IconStyle} />
        </View>
        <TextInput
          autoFocus={![undefined, null, ''].includes(this.props.autoFocus) ? this.props.autoFocus : false}
          onChangeText={value => {
            this.props.handler(value);
          }}
          style={{
            width: '85%'
          }}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          placeholderTextColor={
            this.props.secureTextEntry ? '#B4B4B4' : '#B4B4B4'
          }
        />
      </View>
    );
  }
}

export default LoginInputField;
