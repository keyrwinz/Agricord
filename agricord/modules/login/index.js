import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {faLock, faUserAlt} from '@fortawesome/free-solid-svg-icons';
import LoginInputField from 'modules/login/LoginInputField';
import SignInButton from 'modules/login/SignInButton';

const win = Dimensions.get('window');
const ratio = (win.width / 4336) * 0.7;

class Login extends Component {
  render() {
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={styles.BackgroundContainer}>
        <ScrollView>
          <View style={styles.LoginContainer}>
            <Image
              source={require('assets/logo.png')}
              style={styles.LogoContainer}
            />
            <Image
              source={require('assets/agricordLogo03.png')}
              style={styles.TitleContainer}
            />
            <View style={styles.SignInTextContainer}>
              <Text style={styles.SignInTextStyle}>
                Sign In to Your Account
              </Text>
            </View>
            <View style={styles.UsernameContainer}>
              <LoginInputField icon={faUserAlt} />
            </View>
            <View style={styles.PasswordContainer}>
              <LoginInputField icon={faLock} secureTextEntry={true} />
            </View>
            <TouchableOpacity
              onPress={() => {}}
              style={styles.CreateAccountContainer}>
              <Text style={styles.CreateAccountTextStyle}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.SignInButtonContainer}>
              <SignInButton />
            </View>
            <View style={styles.ForgottenPasswordContainer}>
              <View style={styles.ForgottenPasswordTextContainer}>
                <Text style={styles.ForgottenPasswordTextStyle}>
                  Forgotten Password?
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.SendCodeContainer}>
                <Text style={styles.SendCodeTextStyle}> Send Code</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.DrumScanContainer}
              onPress={() => {
                this.props.navigation.navigate('drumScanLoginStack');
              }}>
              <View style={styles.DrumScanTextContainer}>
                <Text style={styles.DrumScanTextStyle}>
                  Don't have an account? Click here to DrumScan
                </Text>
              </View>
              <View>
                <Image
                  source={require('assets/nfc.png')}
                  style={{height: 50, width: 50}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {},
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
  TitleTextStyle: {},
  SignInTextContainer: {
    paddingBottom: 10,
    paddingTop: 15,
  },
  SignInTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  UsernameContainer: {
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
  },
  PasswordContainer: {
    width: '100%',
    alignItems: 'center',
  },
  CreateAccountContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingRight: '10%',
  },
  CreateAccountTextStyle: {
    color: '#A9A9A9',
    fontSize: 13,
  },
  SignInButtonContainer: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'flex-end',
    paddingRight: '10%',
    paddingTop: 30,
  },
  ForgottenPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },
  ForgottenPasswordTextContainer: {},
  ForgottenPasswordTextStyle: {
    fontSize: 13,
  },
  SendCodeContainer: {},
  SendCodeTextStyle: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  DrumScanContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
  },
  DrumScanTextContainer: {},
  DrumScanTextStyle: {
    fontWeight: 'bold',
    fontSize: 13,
  },
});

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
