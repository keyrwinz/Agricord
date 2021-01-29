import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Color, BasicStyles, Routes } from 'common';
import Style from './Style.js';
import Api from 'services/api/index.js';

import Background from 'assets/inventory/background.svg';
import ItemImage from 'assets/inventory/temp_item.svg';
import FileIcon from 'assets/inventory/file_icon.svg';
import CheckIcon from 'assets/inventory/check_icon.svg';
import { Spinner } from 'components';
import { data } from '../batchPage/data-test.js';
import Config from 'src/config';

const height = Math.round(Dimensions.get('window').height);

class ProductDetailsOffline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      data: null
    }
  }

  componentDidMount(){
  }

  productInformation(data){
    return(
      <View style={Style.Details}>

        {
          (data && data.merchant) && (
            <View style={Style.itemDetailsContainer}>
              <Text style={Style.itemDetailLabel}>
                Merchant
              </Text>
              <Text style={Style.itemDetailValue}>
                {
                  data.merchant
                }
              </Text>
            </View>
          )
        }
        
        {
          (data && data.batch_number) && (
            <View style={Style.itemDetailsContainer}>
              <Text style={Style.itemDetailLabel}>
                Batch
              </Text>
              <Text style={Style.itemDetailValue}>
                {
                  data.batch_number
                }
              </Text>
            </View>
          )
        }

        {
          (data && data.manufacturing_date) && (
            <View style={Style.itemDetailsContainer}>
              <Text style={Style.itemDetailLabel}>
                Manufactured
              </Text>
              <Text style={Style.itemDetailValue}>
                {
                  data.manufacturing_date
                }
              </Text>
            </View>
          )
        }

        {
          (data && data.code) && (
            <View style={Style.itemDetailsContainer}>
              <Text style={Style.itemDetailLabel}>
                Product Trace Code
              </Text>
              <Text style={Style.itemDetailValue}>
                {
                  data.code
                }
              </Text>
            </View>
          )
        }

        {
          (data && data.website) && (
            <View style={Style.itemDetailsContainer}>
              <Text style={Style.itemDetailLabel}>
                Website
              </Text>
              <Text style={Style.itemDetailValue}>
                {
                  data.website
                }
              </Text>
            </View>
          )
        }
        {
          (data && data.nfc) && (
            <View style={Style.itemDetailsContainer}>
              <Text style={Style.itemDetailLabel}>
                NFC Code
              </Text>
              <Text style={Style.itemDetailValue}>
                {
                  data.nfc
                }
              </Text>
            </View>
          )
        }

      </View>
    )
  }

  render() {
    const { data } = this.props.navigation.state.params
    const { loading } = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: Color.containerBackground
        }}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Background style={{ position: 'absolute' }} />
          <View style={
            Style.MainContainer,
            {
              minHeight: height + 25,
              width: '90%',
              marginLeft: '5%',
              marginRight: '5%',
              marginBottom: 100,
              marginTop: 25
            }
          }>
            {data && this.productInformation(data)}
          </View>


        </ScrollView>
        {loading ? <Spinner mode="overlay" /> : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailsOffline);
