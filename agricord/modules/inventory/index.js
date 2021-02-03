import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'components/Pagination/GradientBorder';
import InventoryItem from './InventoryItem';
import InventoryList from './InventoryList';
import { Color, BasicStyles, Routes } from 'common';
import Api from 'services/api/index.js'
import { products } from './data-test.js';
import Style from './Style.js';
import ApplyTask from 'modules/applyTask';
import { Spinner } from 'components';
import _ from 'lodash';
import config from 'src/config';
import { Helper } from 'common';
import NfcManager, {NfcEvents, Ndef} from 'react-native-nfc-manager/NfcManager';

// assets
import TitleLogo from 'assets/inventory/title_logo.svg';
import SearchIcon from 'assets/inventory/search_icon.svg';
import NfcIcon from 'assets/inventory/nfc_icon.svg';
import TaskButton from 'modules/generic/TaskButton.js';
import StackHeaderTitle from 'modules/generic/StackHeaderTitle';

const InventoryStack = createStackNavigator()

const paginationProps=[{
  name:'Herbicide'
}, {
  name:'Fungicide',
}, {
  name: 'Insecticide',
}, {
  name: 'Other'
}]

const Inventory = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTags, setActiveTags] = useState()
  const [loading, setLoading] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [HerbicideData, setHerbicideData] = useState([])
  const [FungicideData, setFungicideData] = useState([])
  const [InsecticideData, setInsecticideData] = useState([])
  const [OtherData, setOtherData] = useState([])

  const [data, setData] = useState([])
  const [filteredHerbicideData, setFilteredHerbicideData] = useState([])
  const [filteredFungicideData, setFilteredFungicideData] = useState([])
  const [filteredInsecticideData, setFilteredInsecticideData] = useState([])
  const [filteredOtherData, setFilteredOtherData] = useState([])
  
  var offset = 0;
  var limit = 5;

  useEffect(() => {
    retrieve(false, paginationProps[props.parentNav.state && props.parentNav.state.params ? props.parentNav.state.params.index : 0].name)
    setActiveIndex(props.parentNav.state && props.parentNav.state.params ? props.parentNav.state.params.index : 0);
  }, [])

  const retrieve = (flag, tag) => {
    const { user } = props.state;
    if(user == null){
      return
    }
    const parameter = {
      condition: {
        column: 'title',
        value: '%' + searchString.toLocaleLowerCase() + '%'
      },
      sort: {
        title: 'asc'
      },
      merchant_id: user.sub_account.merchant.id,
      account_id: user.id,
      inventory_type: 'product_trace',
      type: user.account_type,
      productType: 'all',
      limit: limit,
      offset: flag == true && offset > 0 ? (offset * limit) : offset,
      tags: '%' + tag.toLowerCase() + '%'
    }
    setLoading(true)
    setData([])
    Api.request(Routes.inventoryRetrieve, parameter, response => {
      setLoading(false)
      if (response.data.length > 0) {
        setData(flag == false ? response.data : _.uniqBy([...data, ...response.data], 'id'))
        console.log("^^^^^^^^^^^^^^^^^^^", response.data);
        // setHerbicideData(response.data)
        // setFungicideData(response.data)
        // setInsecticideData(response.data)
        // setOtherData(response.data)

        // setFilteredHerbicideData(response.data)
        // setFilteredFungicideData(response.data)
        // setFilteredInsecticideData(response.data)
        // setFilteredOtherData(response.data)
      } else {
        setData(flag == false ? [] : data)
      }
    }, error => {
      setLoading(false)
    })
  }

  const onPageChange = (activeIndex) => {
    console.log(activeIndex);
    
    setActiveIndex(activeIndex)
    setTimeout(() => {
      retrieve(false, paginationProps[activeIndex].name)
    }, 100);
  }

  const scan = (parameter) => {
    if(config.NFC_TEST && parameter !== null) {
      retrieveProduct(parameter);
    }
  }

  const manageResponse = (tag) => {
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
    manageNfcText(parsed, tag.id)
  }

  const _cancel = () => {
    setLoading(false)
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  const startScanningNFC = async () => {
    console.log('starting')
    setLoading(true)
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      setLoading(false)
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }

  const manageNfcText = (data, id) => {
    setLoading(false)
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
          scan(parameter)
        }
      })
    }
  }

  const startScanning = () => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      setLoading(false)
      manageResponse(tag)
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
    startScanningNFC()
  }

  const retrieveProduct = (params) => {
    const user = props.state.user
    let parameter = {
      condition: [{
        value: params.code,
        column: 'code',
        clause: '='
      }],
      nfc: params.nfc,
      merchant_id: user.sub_account.merchant.id,
      account_type: user.account_type
    }
    manageRequest(parameter, params.title);
  }

  const manageRequest = (parameter, title) => {
    setLoading(true)
    console.log(parameter, "==============");
    Api.request(Routes.productTraceRetrieve, parameter, response => {
      setLoading(false)
      if(response.data != null && response.data.length > 0) {
        props.parentNav.navigate('productDetailsStack', {
          data: {
            ...response.data[0],
            title: title
          }
        })
      } else {
        Else();
      }
    }
    );
  }
  const Else = () => {
    Alert.alert(
      "Opps",
      "Product not found!",
      [
        { text: "OK"}
      ],
      { cancelable: false }
    );
  }

  const searchProductHandler = () => {
    const query = searchString.toLocaleLowerCase()
    switch (activeIndex) {
      case 0: // HERBICIDE
        const data1 = HerbicideData.filter(obj => obj.title.toLocaleLowerCase().indexOf(query) >= 0)
        setFilteredHerbicideData(data1)
        break
      case 1: // FUNGICIDE
        const data2 = FungicideData.filter(obj => obj.title.toLocaleLowerCase().indexOf(query) >= 0)
        setFilteredFungicideData(data2)
        break
      case 2: // INSECTICIDE
        const data3 = InsecticideData.filter(obj => obj.title.toLocaleLowerCase().indexOf(query) >= 0)
        setFilteredInsecticideData(data3)
        break
      case 3: // OTHER
        const data4 = OtherData.filter(obj => obj.title.toLocaleLowerCase().indexOf(query) >= 0)
        setFilteredOtherData(data4)
        break
    }
  }

  return (
    <View style={Style.MainContainer}>
      <View style={{
        width: '100%',
        height: 140
      }}>
        <View style={[BasicStyles.paginationHolder,{
          shadowColor: Color.black,
        }]}>
          <Pagination
            activeIndex={activeIndex}
            onChange={(index) => onPageChange(index)}
            pages={paginationProps}
          >
          </Pagination>
        </View>
        {/* SEARCHBAR */}
        <View style={[Style.searchbarContainer, BasicStyles.paginationHolder]}>
          <TextInput
            style={Style.searchbar}
            placeholder="Search..."
            placeholderTextColor={Color.gray}
            onChangeText={(str) => setSearchString(str)}
          />
          <TouchableOpacity
            style={Style.searchIcon}
            onPress={() => retrieve(false, paginationProps[activeIndex].name)}
          >
            <SearchIcon height="50" width="52" />
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.nfcIcon}
            onPress={() => startScanning()}
          >
            <NfcIcon width="35" />
          </TouchableOpacity>
        </View>
      </View>
      <PagerProvider activeIndex={activeIndex}>

        <Pager panProps={{enabled: false}}>
          <View style={Style.sliderContainer}>
            {/* ===== HERBICIDE ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading} retrieve={(flag) => retrieve(flag, paginationProps[activeIndex].name)}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== FUNGICIDE ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading} retrieve={(flag) => retrieve(flag, paginationProps[activeIndex].name)}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== INSECTICIDE ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading} retrieve={(flag) => retrieve(flag, paginationProps[activeIndex].name)}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== OTHER ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading} retrieve={(flag) => retrieve(flag, paginationProps[activeIndex].name)}/>
          </View>
        </Pager>
      </PagerProvider>

      <TaskButton navigation={props.parentNav}/>
      {loading ? <Spinner mode="overlay" /> : null}
    </View>
  );
}

const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

let InventoryPage = connect(mapStateToProps, mapDispatchToProps)(Inventory);

const InventoryScreen = (props) => {
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="InventoryPage"
        children={(childProps) => <InventoryPage {...childProps} parentNav={props.parentNav} />}
        options={() => ({
          headerTitle: () => (
            <StackHeaderTitle title={'INVENTORY'}/>
          ),
          headerLeft: () => (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => props.parentNav.toggleDrawer()}>
                <FontAwesomeIcon
                  icon={faBars}
                  size={BasicStyles.iconSize}
                  style={[
                    BasicStyles.iconStyle,
                    {
                      color: '#000',
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
    </InventoryStack.Navigator>
  )
}

export default InventoryScreen;
