import React, { Component } from 'react';
import Style from './Style.js';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import { Spinner } from 'components';
import { connect } from 'react-redux';
import { Color, Routes, BasicStyles } from 'common';
import Api from 'services/api/index.js';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { NavigationActions, StackActions } from 'react-navigation';
import ProductCard from 'components/Products/thumbnail/ProductCard.js';
import SlidingButton from 'modules/generic/SlidingButton';
import ProductConfirmationModal from 'modules/modal/ProductConfirmation';
import SuccessCreate from 'modules/modal/SuccessCreateManualBatch';
import config from 'src/config';
import { Helper } from 'common';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager/NfcManager';

const height = Math.round(Dimensions.get('window').height);

class ManualBatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productConfirmation: false,
      taskConfirmation: false,
      data: [],
      isLoading: false,
      matchedProduct: null,
      total: 0,
      newScanned: null,
      createdBatch: null,
      confirmTask: false,
      notes: null,
      scanned: [],
      quantity: 0,
      newlyScanned: null,
      batchProducts: [],
      scannedTraces: [],
      scannedTraceIds: [],
      showRemaining: false,
      remaining_rate: 0,
      scans: [],
      appliedAmount: 0,
      rate: 0,
      session: null
    };
  }

  notesHandler = value => {
    this.setState({ notes: value });
  };

  quantityHandler = value => {
    this.setState({ quantity: value });
  };

  redirect(route) {
    this.props.navigation.navigate(route);
  }

  manageProductRate = data => {
    let currentData = data.map(item => {
      return {
        ...item,
        rate: parseFloat(item.rate) * this.state.totalPaddockArea,
        remaining: 0,
        product: {
          ...item.product,
          rate: parseFloat(item.rate) * this.state.totalPaddockArea,
        },
      };
    });
    this.setState({
      data: currentData,
    });
  };

  componentDidMount() {
    if (this.props.state.dedicatedNfc === true) {
      this.startScanning();
    }
  }

  navigateToScreen = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'drawerStack',
      action: StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: 'Homepage',
            params: {
              initialRouteName: 'Home',
              index: 0,
            },
          }),
        ],
      }),
    });

    this.props.navigation.dispatch(navigateAction);
  };

  setApplyTank() {
    this.setState({ confirmTask: true, taskConfirmation: false });
    const user = this.props.state.user;
    if (user == null) {
      return;
    }
    let batch = {
      spray_mix_id: null,
      machine_id: null,
      merchant_id: user.sub_account.merchant.id,
      account_id: user.account_information.account_id,
      notes: this.state.notes,
      status: 'completed',
      application_rate: this.state.rate,
      water: 0
    };
    const { scannedTraces } = this.state;
    let batch_products = scannedTraces.map((item, index) => {
      return {
        product_id: item.product_id,
        merchant_id: user.sub_account.merchant.id,
        account_id: user.id,
        product_trace_id: item.id,
        applied_rate: item.qty,
        product_attribute_id: item.product_attribute_id,
      };
    });

    let parameter = {
      batch,
      tasks: [],
      batch_products,
    };
    this.setState({ isLoading: true });
    Api.request(
      Routes.batchCreate,
      parameter,
      response => {
        this.setState({ isLoading: false });
        if (response.data !== null) {
          this.setState({
            createdBatch: response.data.batch[0],
            taskConfirmation: true,
            session: {
              session: response.data.batch[0].session,
              time: response.data.batch[0].created_at
            }
          });
          console.log(response.data.batch[0], '---------------------------------response upon create');
        }
        if (response.error !== null && response.error.length > 0) {
          Alert.alert('Error Message', response.error, [{ text: 'OK' }], {
            cancelable: false,
          });
        }
      },
      error => {
        this.setState({
          isLoading: false,
        });
        console.log({ error });
      },
    );
  }

  manageProductConfirmation(param) {
    const user = this.props.state.user;
    const { matchedProduct, data, quantity, batchProducts } = this.state;
    if (this.state.scanned.includes(matchedProduct.batch_number) === false) {
      this.state.scanned.push(matchedProduct.batch_number);
      data.filter(function (item, index) {
        if (item.product.id === matchedProduct.product.id) {
          data[index].product.batch_number.push(matchedProduct.batch_number);
          data[index].product.qty += quantity;
          let product = {
            product_id: item.product.id,
            merchant_id: user.sub_account.merchant.id,
            account_id: user.account_information.account_id,
            product_trace_id: matchedProduct.id,
            applied_rate: null,
          };
          batchProducts.push(product);
        }
      });
    } else {
      Alert.alert(
        'Opps',
        'You have already scanned this product trace!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }
    this.setState({ productConfirmation: false });
  }

  addProductToBatch(trace) {
    const { data, scannedTraces, scannedTraceIds, scans, appliedAmount, rate } = this.state;
    if(isNaN(appliedAmount)) {
      Alert.alert('Error Message', 'Invalid number.');
      return
    }
    if (appliedAmount <= 0) {
      Alert.alert('Error Message', 'Applied amount should be greater than 0.');
      return;
    }
    if (appliedAmount > trace.qty && appliedAmount != trace.qty?.toFixed(2)) {
      console.log(appliedAmount, trace.qty)
      Alert.alert('Error Message', 'Applied amount should be less than remaining volume.');
      return;
    }
    if (scannedTraceIds.indexOf(trace.id) < 0) {
      if (data.length > 0) {
        if (scans.includes(trace.product_id)) {
          let updated = data.map((item, index) => {
            if (item.product_id == trace.product_id) {
              let batch = item.product.batch_number;
              batch.push(trace.batch_number);
              return {
                ...item,
                product: {
                  ...item.product,
                  rate: parseFloat(appliedAmount) + parseFloat(item?.product?.qty),
                  units: item.units,
                  qty: parseFloat(appliedAmount) + parseFloat(item?.product?.qty)
                }
              };
            } else {
              let batch = item.product.batch_number;
              batch.push(trace.batch_number);
              return {
                ...item,
                product: {
                  ...item.product,
                  rate: parseFloat(appliedAmount),
                  units: item.units,
                  qty: parseFloat(appliedAmount),
                }
              };
            }
          });
          this.setState({ data: updated });
        } else {
          let batch = trace.product;
          batch['batch_number'] = [trace.batch_number];
          data.push({
            ...trace,
            product: {
              ...trace.product,
              rate: appliedAmount,
              units: trace.units,
              qty: appliedAmount
            }
          })
        }
      } else {
        let batch = trace.product;
        batch['batch_number'] = [trace.batch_number];
        data.push({
          ...trace,
          product: {
            ...trace.product,
            rate: appliedAmount,
            units: trace.units,
            qty: parseFloat(appliedAmount),
          }
        })
      }
    } else {
      Alert.alert(
        'Error Message',
        'Product Trace already in the list',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }
    trace['qty'] = parseFloat(appliedAmount);
    scannedTraces.push(trace);
    if (scans.includes(trace.product_id) === false) {
      scans.push(trace.product_id);
    }
    scannedTraceIds.push(trace.id);
    this.setState({
      rate: parseFloat(appliedAmount) + parseFloat(rate),
      appliedAmount: 0,
      productConfirmation: false
    });
  }

  closeTaskConfirmation() {
    this.setState({
      taskConfirmation: false,
    });
    this.redirect('applyTaskStack');
  }

  scan = parameter => {
    if (config.NFC_TEST && parameter !== null) {
      this.retrieveProduct(parameter);
    }
  };

  manageResponse(tag) {
    console.log('tag', JSON.stringify(tag));
    let parsed = null;
    if (tag.ndefMessage) {
      const ndefRecords = tag.ndefMessage;

      function decodeNdefRecord(record) {
        if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
          return { text: Ndef.text.decodePayload(record.payload) };
        } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
          return { uri: Ndef.uri.decodePayload(record.payload) };
        }

        return { unknown: null };
      }

      parsed = ndefRecords.map(decodeNdefRecord);
    }
    this.manageNfcText(parsed, tag.id);
  }

  _cancel = () => {
    this.setState({
      isLoading: false,
    });
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  startScanningNFC = async () => {
    console.log('starting');
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      this.setState({
        isLoading: false,
      });
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  manageNfcText(data, id) {
    this.setState({
      isLoading: false,
    });
    if (data) {
      data.map((item, index) => {
        console.log('item', item.text);
        if (index === 0 && item.text) {
          let array = item.text.split(Helper.delimeter);
          let parameter = {
            title: array[0],
            merchant: array[1],
            batch_number: array[2],
            manufacturing_date: array[3],
            code: array[4],
            website: array[5],
            nfc: id,
            link: false,
          };
          this.scan(parameter);
        }
      });
    }
  }

  startScanning = () => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      this.setState({
        isLoading: false,
      });
      this.manageResponse(tag);
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
    this.startScanningNFC();
  };

  retrieveProduct = params => {
    const user = this.props.state.user;
    let parameter = {
      condition: [
        {
          value: params.code,
          column: 'code',
          clause: '=',
        },
      ],
      nfc: params.nfc,
      // 3
      merchant_id: user.sub_account.merchant.id,
      account_type: user.account_type,
    };
    this.manageRequest(parameter);
  };

  manageRequest = parameter => {
    const user = this.props.state.user;
    this.setState({ isLoading: true });
    console.log('->>>>>>>>>>>>>', parameter, Routes.productTraceRetrieveUser);
    Api.request(Routes.productTraceRetrieveUser, parameter, response => {
      this.setState({ isLoading: false });
      if (response.data != null && response.data.length > 0) {
        console.log('[NFC]', response.data);
        this.checkProduct(response.data[0]);
      } else {
        alert('Invalid NFC code.');
      }
      if (this.props.state.dedicatedNfc === true) {
        setTimeout(() => {
          console.log('starting scanning again');
          this.startScanning();
        }, 1000);
      }
    });
  };

  checkProduct(productTrace) {
    const { scannedTraceIds, data } = this.state;
    if (scannedTraceIds.indexOf(parseFloat(productTrace.id)) >= 0) {
      Alert.alert(
        'Error Message',
        'Product Trace already in the list',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }
    let qty = productTrace.qty;
    this.setState({
      matchedProduct: productTrace,
      newlyScanned: {
        ...productTrace,
        rate: qty
      }
    });
    setTimeout(() => {
      this.setState({
        productConfirmation: true,
      });
    }, 100);
  }

  total = () => { };

  else() {
    Alert.alert('Opps', 'Product not found!', [{ text: 'OK' }], {
      cancelable: false,
    });
    this.setState({ productConfirmation: false });
  }

  renderTopCard = () => {
    return (
      <View style={Style.container}>
        <View
          style={{
            width: '30%',
            borderTopLeftRadius: BasicStyles.standardBorderRadius,
            borderBottomLeftRadius: BasicStyles.standardBorderRadius,
            backgroundColor: '#ED1C24',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size={60}
            color={Color.white}
          />
        </View>
        <View
          style={{
            width: '70%',
            paddingTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 20,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#ED1C24',
              fontSize: BasicStyles.standardHeaderFontSize,
            }}>
            Adjust Inventory
          </Text>
          <Text style={Style.text}>Scan the Agricord tag on a chemical drum to deduct product from inventory and record use</Text>
        </View>
      </View>
    );
  };

  renderNotesCard() {
    return (
      <View
        style={{
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
          height: 110,
        }}>
        <Text
          style={{
            fontSize: BasicStyles.standardTitleFontSize,
            fontWeight: 'bold',
          }}>
          Notes:{' '}
        </Text>
        <TextInput
          style={{ height: 40, borderColor: Color.gray }}
          onChangeText={text => this.notesHandler(text)}
          value={this.state.notes}
          placeholder="e.g. Application rate, nozzle type, weather conditions"
        />
      </View>
    );
  }

  render() {
    const { productConfirmation, taskConfirmation, data, isLoading, confirmTask, newlyScanned, remaining_rate, appliedAmount, session } = this.state;
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: Color.containerBackground,
          }}>
          <View
            style={{
              alignItems: 'center',
              height: height,
              flex: 1,
              marginBottom: height,
              backgroundColor: Color.containerBackground,
            }}>
            <View
              style={{
                width: '90%',
                backgroundColor: Color.containerBackground,
              }}>
              {this.renderTopCard()}
              {this.props.state.dedicatedNfc === false ? (
                <TouchableOpacity
                  style={[BasicStyles.standardCardContainer]}
                  onPress={() => this.startScanning()}>
                  <View
                    style={{
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: BasicStyles.standardTitleFontSize,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      SCAN NFC
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              {data.map(dataItem => (
                <ProductCard
                  item={{
                    ...dataItem.product,
                    from: 'paddockPage',
                  }}
                  showRemaining={this.state.showRemaining}
                  remaining={true}
                  key={dataItem.id}
                  navigation={this.props.navigation}
                  theme={'v2'}
                  batch={true}
                  input={true}
                />
              ))}
              {data.length > 0 && (
                this.renderNotesCard()
              )}
            </View>
          </View>
        </ScrollView>
        {
          (data.length > 0) && (
            <SlidingButton
              title={'Complete Batch'}
              label={'Swipe Right to Complete'}
              onSuccess={() => this.setApplyTank()}
              position={taskConfirmation}
            />
          )
        }
        {productConfirmation && (
          <ProductConfirmationModal
            visible={productConfirmation}
            onClose={() =>
              this.setState({
                productConfirmation: false,
              })
            }
            warning={
              'Always confirm the physical volume of product remaining before adding to tank.'
            }
            data={newlyScanned}
            remaining={remaining_rate}
            onSuccess={param => this.addProductToBatch(param)}
            changeText={this.quantityHandler}
            input={true}
            appliedAmount={appliedAmount}
            appliedAmountHandler={(amount) => { this.setState({ appliedAmount: amount }) }}
          />
        )}
        {taskConfirmation && (
          <SuccessCreate
            exit={() => { this.navigateToScreen() }}
            taskConfirmation={confirmTask}
            visible={confirmTask}
            session={session}
          />
        )}

        {isLoading ? <Spinner mode="overlay" /> : null}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualBatchPage);
