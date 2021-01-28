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
import {Routes, Helper} from 'common';
import config from 'src/config';
import SystemVersion from 'services/System.js';
import { Player } from '@react-native-community/audio-toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import {Notifications, NotificationAction, NotificationCategory} from 'react-native-notifications';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
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
      token: null,
      isResponseError: false,
      tags: [],
      tag: {},
      parsedText: null,
      parsedUID: null,
    };
  }

  componentDidMount(){
    // if(config.versionChecker == 'store'){
    //   this.setState({isLoading: true})
    //   SystemVersion.checkVersion(response => {
    //     this.setState({isLoading: false})
    //     if(response == true){
    //       this.getData();
    //     }
    //   })
    // }else{
    //   this.getData(); 
    // }
    // this.audio = new Player('assets/notification.mp3');
    // const initialNotification = await Notifications.getInitialNotification();
    // if (initialNotification) {
    //   this.setState({notifications: [initialNotification, ...this.state.notifications]});
    // }
    this.getData(); 
  }

  _onTagDiscovered = tag => {
    // scan nfc
    console.log('Tag Discovered', tag);
    Vibration.vibrate(1000);
    this.setState({ tag });
    let url = this._parseUri(tag);
    if (url) {
        Linking.openURL(url)
            .catch(err => {
                console.warn(err);
            })
    }

    let text = this._parseText(tag);
    if(text == null || text == ''){
      ToastAndroid.show('NFC failed to read!', ToastAndroid.LONG);
      return
    }
    let splitpayload = text.split(Helper.delimeter);
    this.setState({parsedText: splitpayload});

    let nfcUID = this._parseUID(tag);
    this.setState({parsedUID: nfcUID});
    // this.setState({modal: true});
    this._stopDetection();
    let parameter = {
      title: splitpayload[0],
      merchant: splitpayload[1],
      batch_number: splitpayload[2],
      manufacturing_date: splitpayload[3],
      code: splitpayload[4],
      website: splitpayload[5],
      nfc: nfcUID,
    }
    console.log('product trace', parameter)
    // this._retrieveProduct(parameter);
  }

   _startDetection = () => {
      NfcManager.registerTagEvent(this._onTagDiscovered).then(result => {
          //  alert(console.log('registerTagEvent OK', result))
      })
      .catch(error => {
        console.warn('registerTagEvent fail', error)
      })
  }

  _stopDetection = () => {
    this.setState({isScanning: false});
    NfcManager.unregisterTagEvent()
        .then(result => {
            console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
            console.warn('unregisterTagEvent fail', error)
        })
  }

  _clearMessages = () => {
      this.setState({tag: null});
  }

  _parseUri = (tag) => {
      try {
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
              return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
          }
      } catch (e) {
          console.log(e);
      }
      return null;
  }

  _parseText = (tag) => {
      try {
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
          }
      } catch (e) {
          console.log(e);
      }
      return null;
  }

  _parseUID = (tag) => {
      try {
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return (tag.id);
          }
      } catch (e) {
          console.log(e);
      }
      return null;
  }
  
  _retrieveProductRf = (code) => {
    const parameter = {
      condition: [{
        value: code,
        column: 'rf',
        clause: '='
      }]
    };

    console.log('parameter', parameter)
    this.setState({isScanning: true});
    this.manageRequest(parameter, code);
  }

  checkIfExist = (product) => {
    const { products } = this.props.state;
    for(var i = 0; i < products.length; i++){
      let item = products[i];
      if(item.id == product.id){
        return true;
      }
    }
    return false;
  }
  _retrieveProduct = (params) => {
    const { settings } = this.props.state;
    const { addProduct } = this.props;
    if(settings[0].flag == true){
      this.setState({isScanning: true});
      let parameter = null;
      if(Helper.test == true){
        parameter = {
          condition: [{
            value: params.code,
            column: 'code',
            clause: '='
          }],
          nfc: params.nfc
        };
      }else{
        const { user } = this.props.state;
        if(user == null){
          return
        }
        if(user.account_type == 'MANUFACTURER'){
          parameter = {
            condition: [{
              value: params.code,
              column: 'code',
              clause: '='
            }, {
              value: params.batch_number,
              column: 'batch_number',
              clause: '='
            }, {
              value: params.manufacturing_date,
              column: 'manufacturing_date',
              clause: '='
            }],
            nfc: params.nfc
          };  
        }else{
          parameter = {
            condition: [{
              value: params.code,
              column: 'code',
              clause: '='
            }, {
              value: params.batch_number,
              column: 'batch_number',
              clause: '='
            }, {
              value: params.manufacturing_date,
              column: 'manufacturing_date',
              clause: '='
            }, {
              value: params.nfc,
              column: 'nfc',
              clause: '='
            }]
          };
        }
        
      }
      console.log('parameter', parameter)
      this.manageRequest(parameter, params);
    }else{
      let product = {
        nfc: params.nfc,
        rf: null,
        code: params.code,
        selected: false,
        link: false,
        batch_number: params.batch_number,
        manufacturing_date: params.manufacturing_date,
        title: params.title,
        product: null
      }
      addProduct(product)
      this.setState({isScanning: false, modal: true});
    }
  }

  manageRequest = (parameter, params) => {
    const { addProduct } = this.props;
    const { user } = this.state;
    console.log('redux', this.props.state)
    console.log('manage request', user)
    parameter['merchant_id'] = user.sub_account.merchant.id;
    parameter['account_type'] = user.account_type;
    API.request(Routes.productTraceRetrieve, parameter, response => {
      console.log(response)
      this.setState({isScanning: false});
      if(response.data != null && response.data.length > 0){
        let nfc = response.data[0].nfc;
        let rfid = response.data[0].rf;
        let type = response.data[0].product.type;
        response.data[0]['selected'] = false;
        response.data[0]['link'] = (type == 'regular' && nfc != null && rfid != null) || (type == 'bundled' && rfid != null) ? true : false;
        response.data[0].nfc = (nfc != null) ? nfc : params.nfc;
        response.data[0]['title'] = response.data[0].code;
        let qty = response.data[0].product.trace_qty * 100
        if(this.checkIfExist(response.data[0])){
          ToastAndroid.show('Product already exist!', ToastAndroid.LONG);
        }else if(qty <= 0){
          ToastAndroid.show('Product quantity is zero!', ToastAndroid.LONG);
        }else{
          this.setState({modal: true})
          addProduct(response.data[0])
        }
      }else if(response.data == null && response.error != null){
        ToastAndroid.show(response.error, ToastAndroid.LONG);
      }else{
        ToastAndroid.show('Product not found!', ToastAndroid.LONG);
      }
    });
  }

  getData = async () => {
    try {
      const token = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      if(token != null) {
        this.setState({token});
        this.login();
      }
    } catch(e) {
      // error reading value
    }
  }
  
  redirectToForgotpass(){
    const {navigation} = this.props;
    navigation.navigate('forgotPasswordScreen')
  }


  login = () => {
    this.test();
    const { login } = this.props;
    console.log('test')
    if(this.state.token != null){
      this.setState({isLoading: true});
      Api.getAuthUser(this.state.token, (response) => {
        login(response, this.state.token);
        let parameter = {
          condition: [{
            value: response.id,
            clause: '=',
            column: 'id'
          }]
        }
        console.log('parameter', parameter)
        Api.request(Routes.accountRetrieve, parameter, userInfo => {
          if(userInfo.data.length > 0){
            login(userInfo.data[0], this.state.token);
            this.retrieveUserData(userInfo.data[0].id)
          }else{
            this.setState({isLoading: false});
            login(null, null)
          }
        }, error => {
          this.setState({isResponseError: true})
        })
      }, error => {
        this.setState({isResponseError: true})
      })
    }
  }

  test = () => {
    if(config.TEST == true){
      this.props.navigation.navigate('drawerStack');
      return true;
    }
  }

  retrieveUserData = (accountId) => {
    if(Helper.retrieveDataFlag == 1){
      this.setState({isLoading: false});
      this.props.navigation.navigate('drawerStack');  
    }else{
      // const { setNotifications, setMessenger } = this.props;
      // let parameter = {
      //   account_id: accountId
      // }
      // this.retrieveSystemNotification();
      // Api.request(Routes.notificationsRetrieve, parameter, notifications => {
      //   setNotifications(notifications.size, notifications.data)
      //   Api.request(Routes.messagesRetrieve, parameter, messages => {
      //     setMessenger(messages.total_unread_messages, messages.data)
      //     this.setState({isLoading: false});
      //     Pusher.listen(response => {
      //       this.managePusherResponse(response)
      //     });
      //     // this.props.navigation.replace('loginScreen')
      //     this.checkOtp()
      //   }, error => {
      //     this.setState({isResponseError: true})
      //   })
      // }, error => {
      //   this.setState({isResponseError: true})
      // })
    }
  }


  submit(){
    this.test();
    const { username, password } = this.state;
    const { login } = this.props;
    if((username != null && username != '') && (password != null && password != '')){
      this.setState({isLoading: true, error: 0});
      // Login
      Api.authenticate(username, password, (response) => {
        if(response.error){
          this.setState({error: 2, isLoading: false});
        }
        if(response.token){
          const token = response.token;
          Api.getAuthUser(response.token, (response) => {
            login(response, token);
            let parameter = {
              condition: [{
                value: response.id,
                clause: '=',
                column: 'id'
              }]
            }
            Api.request(Routes.accountRetrieve, parameter, userInfo => {
              if(userInfo.data.length > 0){
                login(userInfo.data[0], token);
                this.retrieveUserData(userInfo.data[0].id)
              }else{
                this.setState({isLoading: false});
                this.setState({error: 2})
              }
            }, error => {
              this.setState({isResponseError: true})
            })
            
          }, error => {
            this.setState({isResponseError: true})
          })
        }
      }, error => {
        console.log('error', error)
        this.setState({isResponseError: true})
      })
      // this.props.navigation.navigate('drawerStack');
    }else{
      this.setState({error: 1});
    }
  }

  usernameHandler = value => {
    this.setState({username: value});
  };

  passwordHandler = value => {
    this.setState({password: value});
  };

  render() {
    const { isLoading, error, isResponseError } = this.state;
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
            {error > 0 ? <View style={styles.messageContainer}>
              {error == 1 ? (
                <Text style={styles.messageText}>Please fill up the required fields.</Text>
              ) : null}

              {error == 2 ? (
                <Text style={styles.messageText}>Username and password didn't match.</Text>
              ) : null}
            </View> : null}
            <View style={styles.UsernameContainer}>
              <LoginInputField
                autoFocus = {true}
                icon={faUserAlt}
                placeholder="Username or Email"
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
            {/* <TouchableOpacity
              onPress={() => {}}
              style={styles.CreateAccountContainer}>
              <Text style={styles.CreateAccountTextStyle}>Create Account</Text>
            </TouchableOpacity> */}
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
                onPress={() => this.redirectToForgotpass()}
                style={styles.SendCodeContainer}>
                <Text style={styles.SendCodeTextStyle}> Send Code</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.DrumScanContainer}
              onPress={() => {
                // this.props.navigation.navigate('drumScanLoginStack');
                this._startDetection()
              }}>
              <View style={styles.DrumScanTextContainer}>
                <Text style={styles.DrumScanTextStyle}>
                  Don't have an account? Click here to DrumScan
                </Text>
              </View>
              <View>
                <Image
                  source={require('assets/nfc.png')}
                  style={{height: 50, width: 50, marginLeft: 25}}
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
