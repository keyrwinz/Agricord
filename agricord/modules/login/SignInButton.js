import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import styles from 'modules/login/Styles.js';

class SignInButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress();
        }}
        style={styles.ButtonContainer}>
        <Text style={styles.ButtonTextStyle}>Sign In</Text>
      </TouchableOpacity>
    );
  }
}

export default SignInButton;
