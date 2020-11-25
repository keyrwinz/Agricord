import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class SignInButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.ButtonContainer}>
        <Text style={styles.ButtonTextStyle}>Sign In</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  ButtonContainer: {
    height: 50,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BADC78',
    borderRadius: 45,
    elevation: 5,
  },
  ButtonTextStyle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default SignInButton;
