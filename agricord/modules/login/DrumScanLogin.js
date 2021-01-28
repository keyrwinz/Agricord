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
import { Helper } from 'common';
import NfcManager, {NfcEvents, Ndef} from 'react-native-nfc-manager/NfcManager';

const win = Dimensions.get('window');
const ratio = (win.width / 4336) * 0.7;
class DrumScanLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(){
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      this.setState({
        isLoading: false
      })
      this.manageResponse(tag)
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
    this.startScanningNFC()
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  manageResponse(tag){
    console.log('tag', JSON.stringify(tag))
    let parsed = null
    if(tag.ndefMessage){
      const ndefRecords = tag.ndefMessage;

      function decodeNdefRecord(record) {
          if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return {'text': Ndef.text.decodePayload(record.payload)};
          } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
              return {'uri': Ndef.uri.decodePayload(record.payload)};
          }

          return {'unknown': null}
      }

      parsed = ndefRecords.map(decodeNdefRecord);
    }
    this.manageNfcText(parsed)
  }

  _cancel = () => {
    this.setState({
      isLoading: false
    })
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  startScanningNFC = async () => {
    console.log('starting')
    this.setState({
      isLoading: true
    })
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      this.setState({
        isLoading: false
      })
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }

  manageNfcText(data){
    this.setState({
      isLoading: false
    })
    if(data){
      data.map((item, index) => {
        console.log('item', item.text)
        if(index === 0 && item.text){
          let array = item.text.split(Helper.delimeter)
          let parameter = {
            title: array[0],
            merchant: array[1],
            batch_number: array[2],
            manufacturing_date: array[3],
            code: array[4],
            website: array[5],
            nfc: '12312321321',
            link: false
          }
          console.log('parameter', parameter)
        }
      })
    }
  }

  render() {
    const { isLoading } = this.state;
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
          <View style={[styles.InstructionsContainer, {
            paddingTop: 0,
            marginTop: 25
          }]}>
            {isLoading ? (
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
