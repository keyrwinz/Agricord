import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View, Image, Text, ScrollView, SafeAreaView,  TouchableOpacity, Dimensions, Alert, TextInput } from 'react-native';
import { Spinner, Empty} from 'components';
import { connect } from 'react-redux';
import { Color, Routes ,BasicStyles} from 'common'
import Api from 'services/api/index.js'
import { Divider } from 'react-native-elements';
import _, { isError } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faExclamationTriangle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle as faExclamationTriangle, faTint} from '@fortawesome/free-solid-svg-icons';
import {data} from './data-test.js';
import ProductCard from 'components/Products/thumbnail/ProductCard.js';
import KeySvg from 'assets/settings/key.svg';
import SlidingButton from 'modules/generic/SlidingButton';
import ProductConfirmationModal from 'modules/modal/ProductConfirmation'; 
import TaskConfirmationModal from 'modules/modal/TaskConfirmation';
import config from 'src/config';
import { Helper } from 'common';
import NfcManager, {NfcEvents, Ndef} from 'react-native-nfc-manager/NfcManager';


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);


class paddockPage extends Component{
  
  constructor(props){
    super(props);
    this.state = { 
      pressed:false,
      applyTank: true,
      productConfirmation: false,
      taskConfirmation: false,
      data: [],
      isLoading: false,
      matchedProduct: null,
      message: null,
      isAdded: false,
      currentBatch: null,
      total: 0,
      newScanned: null,
      createdBatch: null,
      confirmTask: false,
      notes: null,
      scanned: [],
      quantity: 0,
      rates: [],
      newlyScanned: null
    }
  }

  notesHandler = (value) => {
    this.setState({notes: value});
  }

  quantityHandler = (value) => {
    this.setState({quantity: value})
  }

  componentDidMount(){
    if(this.props.state.dedicatedNfc === true) {
      this.startScanning();
    }
    const { task } = this.props.state; 
    if (task == null && (task && task.spray_mix == null)) {
      return
    }
    const parameter = {
      condition: [{
        value: task.spray_mix.id,
        column: 'spray_mix_id',
        clause: '='
      }],
      sort: {
        created_at: 'desc'
      },
      offset: 0,
      limit: 10
    };
    this.setState({
      isLoading: true
    })
    Api.request(Routes.sprayMixProductsRetrieve, parameter, response => {
      this.setState({data: response.data, isLoading: false});
    },
    error => {
      this.setState({
        isLoading: false
      })
        console.log({error});
      },
    );
  }

  setApplyTank(){
    this.setState({confirmTask: true, taskConfirmation: true})
    const { task, paddock } = this.props.state;
    const user = this.props.state.user
    let batch = {
      spray_mix_id: task.spray_mix.id,
      machine_id: task.machine.id,
      merchant_id: user.sub_account.merchant.id,
      account_id: user.account_information.account_id,
      notes: this.state.notes,
      water: (this.props.navigation.state.params.max_area * this.props.navigation.state.params.application_rate) - this.total(),
      status: 'inprogress'
    }
    let tasks = {
      paddock_plan_id: paddock.data[0].paddock_plan_id,
      paddock_id: paddock.data[0].paddock_id,
      category: paddock.data[0].category,
      due_date: paddock.data[0].due_date,
      nickname: paddock.data[0].nickname,
      spray_mix_id: task.spray_mix.id,
      merchant_id: user.sub_account.merchant.id,
      status: 'inprogress',
    }
    let parameter = {
      batch, tasks
    }
    this.setState({isLoading: true});
    Api.request(Routes.batchCreate, parameter, response => {
      this.setState({isLoading: false});
      this.setState({createdBatch: response.data});
    },
    error => {
      this.setState({
        isLoading: false
      })
      console.log({error});
    },
  );
  }

  manageProductConfirmation(){
    const { matchedProduct, data, quantity, rates } = this.state;
    if(this.state.scanned.includes(matchedProduct.batch_number) === false) {
      this.state.scanned.push(matchedProduct.batch_number)
      data.filter(function(item, index) {
        if(item.product.id === matchedProduct.product.id) {
          data[index].product.batch_number.push(matchedProduct.batch_number)
          rates.push(item.product.rate > matchedProduct.product.qty[0].total_remaining_product ? matchedProduct.product.qty[0].total_remaining_product : item.product.rate)
          data[index].product.qty += quantity;
        }
      })
    } else {
      Alert.alert(
        "Opps",
        "You have already scanned this product trace!",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
    this.setState({productConfirmation: false});
    this.setState({isAdded: true});
    if(this.props.state.dedicatedNfc === true) {
      setTimeout(() => {  this.startScanning(); }, 4000);
    }
  }

  manageTaskConfirmation(){
    this.setState({confirmTask: true});
    let parameter = {
      id: this.state.createdBatch?.id,
      status: 'completed'
    }
    this.setState({isLoading: true});
    Api.request(Routes.batchUpdateStatus, parameter, response => {
      this.setState({confirmTask: false, taskConfirmation: false, isLoading: false})
      },
      error => {
        this.setState({
          isLoading: false
        })
        console.log({error});
      },
    );
  }

  scan = (parameter) => {
    if(config.NFC_TEST && parameter !== null) {
      this.retrieveProduct(parameter);
    }
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
    this.manageNfcText(parsed, tag.id)
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

  manageNfcText(data, id){
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
            nfc: id,
            link: false
          }
          this.scan(parameter)
        }
      })
    }
  }

  startScanning = () => {
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

  retrieveProduct = (params) => {
    const user = this.props.state.user
    let parameter = {
      condition: [{
        value: params.code,
        column: 'code',
        clause: '='
      }],
      nfc: params.nfc,
      // 3 
      merchant_id: user.sub_account.merchant.id,
      account_type: user.account_type
    }
    this.manageRequest(parameter);
  }

  manageRequest = (parameter) => {
    const user = this.props.state.user
    this.setState({isLoading: true});
    let route = null;
    if(user.account_type === 'USER') {
      route = Routes.productTraceRetrieveUser
    } else {
      route = Routes.productTraceRetrieve
    }
    Api.request(route, parameter, response => {
      this.setState({isLoading: false});
      if(response.data != null && response.data.length > 0) {
        this.checkProduct(this.state.data, response.data[0].product.id, response.data[0])
      } else {
        this.setState({message: response.error})
        this.else();
      }
    }
    );
  }

  checkProduct(array, id, value) {
    array.map(item => {
      if (item.product.id === id) {
        this.setState({matchedProduct: value});
        this.setState({newlyScanned: item});
        this.setState({
          productConfirmation: true
        })
      }
    })
  }

  total = () => {
    let total = this.state.total;
    this.state.rates.map(item => {
      total += parseInt(item);
    })
    this.setState({total: total})
    return total;
  }

  else() {
    Alert.alert(
      "Opps",
      "Product not found!",
      [
        { text: "OK"}
      ],
      { cancelable: false }
    );
    this.setState({productConfirmation: false});
  }

  renderTopCard=()=>{
    return(
    <View style={Style.container}>
      <View 
        style={{
          width: '30%',
          borderTopLeftRadius: BasicStyles.standardBorderRadius,
          borderBottomLeftRadius: BasicStyles.standardBorderRadius,
          backgroundColor: '#ED1C24',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
        <FontAwesomeIcon icon={faExclamationTriangle} size={60} color={Color.white}/>
      </View>
      <View style={{
          width: '70%',
          paddingTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 20
        }}>
        <Text style={{
            fontWeight: 'bold',
            color: '#ED1C24',
            fontSize: BasicStyles.standardHeaderFontSize,
          }}>Create Batch</Text>
        <Text style={Style.text}>1. Confirm mixing order on label</Text>
        <Text style={Style.text}>2. Scan the Agricord tag on each drum to record quantity added and details</Text>
        <Divider style={BasicStyles.standardDivider}></Divider>
      </View>
    </View>
    )
  }

  renderNotesCard(){
    return(
      <View style={{
          width: '100%',
          marginTop: 15,
          backgroundColor: Color.white,
          borderRadius: 22,
          borderColor: '#FFFFFF',
          ...BasicStyles.standardShadow,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          paddingRight: 15,
          height: 110
      }}>
          
          <Text style={{
              fontSize: BasicStyles.standardTitleFontSize,
              fontWeight: 'bold'
            }}>Notes: </Text>
            <TextInput
              style={{ height: 40, borderColor: Color.gray}}
              onChangeText={text => this.notesHandler(text)}
              value={this.state.notes}
              placeholder='e.g. Application rate, nozzle type, weather conditions'
            />
       </View>

    )
  }

  render() {
    const { applyTank, productConfirmation, taskConfirmation, data, isLoading, matchedProduct, isAdded, confirmTask, newlyScanned } = this.state;
    const { task } = this.props.state;
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}

          style={{
            backgroundColor: Color.containerBackground
          }}>
          <View style={{
            alignItems: 'center',
            height: height,
            flex: 1,
            marginBottom: height,
            backgroundColor: Color.containerBackground
          }}>
            <View style={{
                width: '90%',
                backgroundColor: Color.containerBackground
              }}>
                {
                  this.renderTopCard()
                }
                { this.props.state.dedicatedNfc === false ?
                  <TouchableOpacity
                    style={[
                      BasicStyles.standardCardContainer
                      ]}
                    onPress={() => this.startScanning()}
                  >
                    <View  style={{
                        width: '100%',
                      }}>
                        <Text style={{
                          fontSize: BasicStyles.standardTitleFontSize,
                          textAlign: 'center',
                          fontWeight: 'bold'
                        }}>SCAN NFC</Text>
                    </View>
                  </TouchableOpacity>
                : null }
                
                 {
                  data.map( item => (
                    <ProductCard
                        item={{
                          ...item.product,
                          from: 'paddockPage'
                        }}
                        key={item.id}
                        navigation={this.props.navigation}
                        theme={'v2'}
                        batch={true}
                      />
                  ))
                }
                {
                  data.length == 0 && (
                    <Text style={{
                      marginTop: 10,
                      textAlign: 'center'
                    }}>{ isLoading ? '' : 'No products found'}</Text>
                  )
                }
               <TouchableOpacity style={[
                  BasicStyles.standardCardContainer,
                  {
                    backgroundColor: Color.blue,
                    paddingRight: 10,
                    borderColor: Color.blue
                  }
                  ]}
                  >
                  <View style={{
                      width: '70%',
                      flexDirection: 'row'
                    }}>
                      <FontAwesomeIcon style={{left: 15, top: 5}} icon={faTint} size={15} color={Color.white}/>
                      <FontAwesomeIcon style={{left: 10, bottom: 2}} icon={faTint} size={12} color={Color.white}/>
                      <FontAwesomeIcon style={{left: 6, bottom: -9}} icon={faTint} size={9} color={Color.white}/>
                    <Text style={{
                      color: Color.white,
                      marginLeft:15,
                      fontSize: BasicStyles.standardTitleFontSize
                    }}>Water</Text>
                  </View>
                  
                  <Text style={{
                      color: Color.white,
                      fontSize: BasicStyles.standardTitleFontSize,
                      fontWeight: 'bold',
                      textAlign: 'right',
                      width: '30%'
                    }}>{task && task.params ? task.params.volume + task.params.units : ''}</Text>
               </TouchableOpacity>
              {
                this.renderNotesCard()
              }
            </View>
         </View>
        </ScrollView>
        {
          (this.state.data.length === this.state.scanned.length) && (
            <SlidingButton
              title={'Apply Tank'}
              label={'Swipe Right to Complete'}
              onSuccess={() => this.setApplyTank()}
              position={taskConfirmation}
              />
          )
        }
        {
          (productConfirmation) && (
            <ProductConfirmationModal
              visible={productConfirmation}
              onClose={() => this.setState({
                productConfirmation: false
              })}
              data={{
                title: matchedProduct.product.title,
                manufacturing_date: matchedProduct.manufacturing_date,
                volume_remaining: matchedProduct.volume,
                batch_number: matchedProduct.batch_number,
                quantity: matchedProduct.product.qty[0].total_remaining_product,
                rate: newlyScanned.product.rate
              }}
              onSuccess={() => this.manageProductConfirmation()}
              changeText={this.quantityHandler}
            />
          )
        }
        {
          (taskConfirmation) && (
            <TaskConfirmationModal
              onSuccess={() => this.manageTaskConfirmation()}
              taskConfirmation={confirmTask}
              visible={confirmTask}
              onClose={() => this.setState({
                taskConfirmation: false
              })}
            />
          )
        }

        {isLoading ? <Spinner mode="overlay" /> : null}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(paddockPage);
