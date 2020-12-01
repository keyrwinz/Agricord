import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import styles from 'modules/login/Styles.js';
import Ring from 'modules/login/Ring.js';

const win = Dimensions.get('window');
const ratio = (win.width / 4336) * 0.7;
class DrumScanLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanning: false,
    };
  }
  render() {
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={styles.BackgroundContainer}>
        <View style={styles.LoginContainer}>
          <Image
            source={require('assets/logo.png')}
            style={styles.LogoContainer}
          />
          <Image
            source={require('assets/agricordLogo03.png')}
            style={styles.TitleContainer}
          />
          <View style={styles.InstructionsContainer}>
            {this.state.isScanning ? (
              <Text style={styles.InstructionsTextStyle}>
                Hold your phone close to an Agricord smart label....
              </Text>
            ) : (
              <Ring />
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default DrumScanLogin;
