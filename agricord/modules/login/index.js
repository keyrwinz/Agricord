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
import styles from 'modules/login/Styles.js';
import {Spinner} from 'components';
import Api from 'services/api/index.js';
import {Routes} from 'common';

const win = Dimensions.get('window');
const ratio = (win.width / 4336) * 0.7;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: '',
      password: '',
      error: 0,
      errorMessage: '',
    };
  }

  submit = () => {
    const {login} = this.props;
    const {username, password} = this.state;
    if (
      username != null &&
      username != '' &&
      (password != null && password != '')
    ) {
      this.setState({isLoading: true, error: 0});
      Api.authenticate(
        username,
        password,
        response => {
          if (response.error) {
            this.setState({errorMessage: response.error, isLoading: false});
          }
          if (response.token) {
            const token = response.token;
            Api.getAuthUser(
              token,
              response => {
                console.log('response id', response.id);
                login(response, token);
                let parameter = {
                  condition: [
                    {
                      value: response.id,
                      clause: '=',
                      column: 'id',
                    },
                  ],
                };
                Api.request(
                  Routes.accountRetrieve,
                  parameter,
                  userInfo => {
                    this.setState({isLoading: false});
                    if (userInfo.data.length > 0) {
                      login(userInfo.data[0], token);
                      setTimeout(() => {
                        const {user} = this.props.state;
                        console.log('login user', user);
                        this.props.navigation.navigate('drawerStack');
                      }, 100);
                    } else {
                      this.setState({error: 2});
                      login(null, null);
                    }
                  },
                  error => {},
                );
              },
              error => {},
            );
          }
        },
        error => {
          console.log('Login error', error);
        },
      );
    } else {
      this.setState({error: 1});
    }
  };

  usernameHandler = value => {
    this.setState({username: value});
  };

  passwordHandler = value => {
    this.setState({password: value});
  };

  render() {
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={styles.BackgroundContainer}>
        <ScrollView style={{height: '100%'}}>
          {this.state.isLoading ? <Spinner mode="overlay" /> : null}
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
              <LoginInputField
                icon={faUserAlt}
                placeholder="Login or Username"
                handler={this.usernameHandler}
              />
            </View>
            <View style={styles.PasswordContainer}>
              <LoginInputField
                icon={faLock}
                secureTextEntry={true}
                placeholder="Password"
                handler={this.passwordHandler}
              />
            </View>
            <TouchableOpacity
              onPress={() => {}}
              style={styles.CreateAccountContainer}>
              <Text style={styles.CreateAccountTextStyle}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.SignInButtonContainer}>
              <SignInButton
                onPress={() => {
                  console.log('Click');
                  this.submit();
                }}
              />
            </View>
            <View style={styles.ForgottenPasswordContainer}>
              <View style={styles.ForgottenPasswordTextContainer}>
                <Text style={styles.ForgottenPasswordTextStyle}>
                  Forgotten Password?
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  const {navigate} = this.props.navigation;
                  navigate('ForgotPassword');
                }}
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

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    login: (response, token) => {
      dispatch(actions.login(response, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
