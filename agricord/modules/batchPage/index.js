import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View, Image, Text, ScrollView, SafeAreaView,  TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Spinner, Empty} from 'components';
import { connect } from 'react-redux';
import { Color, Routes ,BasicStyles} from 'common'
import Api from 'services/api/index.js'
import { Divider } from 'react-native-elements';
import _, { isError } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle as faExclamationTriangleSolid} from '@fortawesome/free-solid-svg-icons';
import {data} from './data-test.js';
import ProductCard from 'components/Products/thumbnail/ProductCard.js';
import KeySvg from 'assets/settings/key.svg';
import SlidingButton from 'modules/generic/SlidingButton';
import ProductConfirmationModal from 'modules/modal/ProductConfirmation'; 
import TaskConfirmationModal from 'modules/modal/TaskConfirmation';
import config from 'src/config';
import Nfc from 'src/services/Nfc';


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
      currentBatch: null
    }
  }

  componentDidMount(){
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
        let alpha = {id: 3, product: {code: "2EHKQT9RSFCXU5LOW7801IJNMBVGZYPA", id: 16, merchant_id: "1", qty: 0, title: "Alpha 110L", type: "regular", variation: [{payload: "Millilitres (ml)", payload_value: "1000"}]}}
        response.data.push(alpha)
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
    const { task } = this.props.state;
    const user = this.props.state.user
    this.setState({
      taskConfirmation: true
    })
    let parameter = {
      spray_mix_id: task.spray_mix.id,
      machine_id: task.machine.id,
      merchant_id: user.sub_account.merchant.id,
      account_id: user.account_information.account_id,
      notes: '',
      water: task && task.params ? task.params.volume + task.params.units : 0,
      status: 'ongoing'
    }
    this.setState({isLoading: true});
    Api.request(Routes.batchCreate, parameter, response => {
      this.setState({isLoading: false});
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
    this.setState({productConfirmation: false});
    this.setState({isAdded: true});
  }

  manageTaskConfirmation(){
    let parameter = {
      id: 1,
      status: 'completed'
    }
    this.setState({isLoading: true});
    Api.request(Routes.batchUpdateStatus, parameter, response => {
      this.setState({isLoading: false});
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
    let params = null
    if (parameter) {
    } else {
      params = {
        //Alpha 1000 product
        code: '25739366062713749471680984040588',
        // code: '43629563207499567584704911882320',
        nfc: 'C89B5424080104E0'
      }
    }
    if(config.NFC_TEST) {
      this.retrieveProduct(params);
    }
  }

  startScanning = () => {
    Nfc.scan(this.scan());
  }

  retrieveProduct = (params) => {
    const user = this.props.state.user
    let parameter = null;
    parameter = {
      condition: [{
        value: params.code,
        column: 'code',
        clause: '='
      }],
      nfc:params.nfc,
      //  user.sub_account.merchant.id
      merchant_id: 3,
      // user.account_type
      account_type: 'MANUFACTURER'
    }
    this.manageRequest(parameter);
  }

  manageRequest = (parameter) => {
    this.setState({isLoading: true});
    Api.request(Routes.productTraceRetrieve, parameter, response => {
      this.setState({isLoading: false});
      if(response.data != null && response.data.length > 0) {
        this.checkProduct(response.data, response.data[0].product.id)
      } else {
        this.setState({message: response.error})
        this.else();

      }
    }
    );
  }

  checkProduct(array, id) {
    array.map(item => {
      if (item.product.id === id) {
        this.setState({matchedProduct: item});
        this.setState({
          productConfirmation: true
        })
      } else {
        this.else();
      }
    })
  }

  else() {
    Alert.alert(
      "Opps",
      "No matched found!",
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
        <FontAwesomeIcon icon={faExclamationTriangleSolid} size={60} color={Color.white}/>
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
          height: 80
      }}>
          
          <Text style={{
              fontSize: BasicStyles.standardTitleFontSize,
              fontWeight: 'bold'
            }}>Notes: </Text>

          <Text style={{
              fontSize: BasicStyles.standardFontSize,
              color: Color.gray
            }}>Notes: </Text>
       </View>

    )
  }

  render() {
    const { applyTank, productConfirmation, taskConfirmation, data, isLoading, matchedProduct, isAdded } = this.state;
    const { task } = this.props.state;
    let n = matchedProduct ? matchedProduct.product.title.split(" ") : null;
    let volume = n ? n[n.length - 1] : null;
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
                        addedProduct={matchedProduct}
                        isAdded={isAdded}
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
                    paddingRight: 10
                  }
                  ]}
                  onPress={() => this.setState({
                    taskConfirmation: true
                  })}
                  >
                  <View style={{
                      width: '70%',
                      flexDirection: 'row'
                    }}>
                    <KeySvg />
                    <Text style={{
                      color: Color.white,
                      marginLeft:10,
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
          (isAdded) && (
            <SlidingButton
              title={'Apply Tank'}
              label={'Swipe Right to Complete'}
              onSuccess={() => this.setApplyTank()}
              position={taskConfirmation}
              />
          )
        }
        {
          (matchedProduct) && (
            <ProductConfirmationModal
              visible={productConfirmation}
              onClose={() => this.setState({
                productConfirmation: false
              })}
              data={{
                title: matchedProduct.product.title,
                manufacturing_date: matchedProduct.manufacturing_date,
                volume_remaining: volume,
                batch_number: matchedProduct.batch_number
              }}
              onSuccess={() => this.manageProductConfirmation()}
            />
          )
        }
        {
          (taskConfirmation) && (
            <TaskConfirmationModal
              visible={taskConfirmation}
              onClose={() => this.setState({
                taskConfirmation: false
              })}
              onSuccess={() => this.manageTaskConfirmation}
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
