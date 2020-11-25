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

const win = Dimensions.get('window');
const ratio = (win.width / 4336) * 0.7;
class DrumScanLogin extends Component {
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
            <Text style={styles.InstructionsTextStyle}>
              Hold your phone close to an Agricord smart label....
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  BackgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    elevation: 2,
  },
  LoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '38%',
  },
  LogoContainer: {
    height: 180,
    width: 180,
  },
  TitleContainer: {
    width: 4336 * ratio,
    height: 882 * ratio,
  },
  InstructionsContainer: {
    width: '70%',
    paddingTop: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InstructionsTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DrumScanLogin;
