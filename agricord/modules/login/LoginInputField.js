import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

class LoginInputField extends Component {
  render() {
    return (
      <View style={styles.InputContainer}>
        <View style={styles.IconContainer}>
          <FontAwesomeIcon icon={this.props.icon} style={styles.IconStyle} />
        </View>
        <TextInput
          onChangeText={() => {}}
          secureTextEntry={this.props.secureTextEntry}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  IconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  IconStyle: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
});

export default LoginInputField;
