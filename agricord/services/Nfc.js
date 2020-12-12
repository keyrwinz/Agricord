import NfcManager, {Ndef} from 'react-native-nfc-manager';
import { Helper } from 'common';

export default {
  scanning(params){
    if(Helper.test == true){
      let parameter = {
        code: '58450601523942082477168394392869',
        nfc: '321312'
      }
      this._retrieveProduct(parameter);
    }else{
      this._startDetection();
    }
  },
  _onTagDiscovered(tag){
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
    this._retrieveProduct(parameter);
  },
  _startDetection(){
      NfcManager.registerTagEvent(this._onTagDiscovered).then(result => {
          //  alert(console.log('registerTagEvent OK', result))
      })
      .catch(error => {
        console.warn('registerTagEvent fail', error)
      })
  },
  _stopDetection(){
    this.setState({isScanning: false});
    NfcManager.unregisterTagEvent()
        .then(result => {
            console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
            console.warn('unregisterTagEvent fail', error)
        })
  },
  _clearMessages(){
      this.setState({tag: null});
  },
  _parseUri(tag){
      try {
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
              return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
          }
      } catch (e) {
          console.log(e);
      }
      return null;
  },
  _parseText(tag){
      try {
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
          }
      } catch (e) {
          console.log(e);
      }
      return null;
  },
  _parseUID(tag){
      try {
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return (tag.id);
          }
      } catch (e) {
          console.log(e);
      }
      return null;
  },
  retrieveProduct(params) {
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
  },
  manageRequest(parameter, params){
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
}