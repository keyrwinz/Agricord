import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
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
          autoFocus={true}
          onChangeText={value => {
            this.props.handler(value);
          }}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          placeholderTextColor={
            !this.props.secureTextEntry ? '#000000' : '#B4B4B4'
          }
        />
      </View>
    );
  }
}

export default LoginInputField;
