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

// assets
import TitleLogo from 'assets/inventory/title_logo.svg';
import SearchIcon from 'assets/inventory/search_icon.svg';
import NfcIcon from 'assets/inventory/nfc_icon.svg';
import TaskButton from 'modules/generic/TaskButton.js';

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

  useEffect(() => {
    retrieveData()
  }, [])

  const retrieveData = () => {
    const parameter = {
      condition: {
        column: 'title',
        value: '%%'
      },
      sort: {
        title: 'asc'
      },
      merchant_id: 2,
      account_id: 7,
      inventory_type: 'product_trace',
      type: 'DISTRIBUTOR',
      productType: 'all',
      limit: 5,
      offset: 0
    }
    setLoading(true)
    setData([])
    Api.request(Routes.inventoryRetrieve, parameter, response => {
      if (response.data.length) {
        setLoading(false)
        setData(response.data)
        // setHerbicideData(response.data)
        // setFungicideData(response.data)
        // setInsecticideData(response.data)
        // setOtherData(response.data)

        // setFilteredHerbicideData(response.data)
        // setFilteredFungicideData(response.data)
        // setFilteredInsecticideData(response.data)
        // setFilteredOtherData(response.data)
      }
      console.log({ inventoryResponse: response })
    }, error => {
      console.log({ inventoryError: error })
      setLoading(false)
    })
  }

  useEffect(() => {
    if (props.initialPage !=null) {
      switch (props.initialPage) {
        case 'InventoryHerbicides':
          setActiveIndex(0)
          break;
        case 'InventoryFungicides':
          setActiveIndex(1)
          break;
        case 'InventoryInsecticides':
          setActiveIndex(2)
          break;
        case 'InventoryOther':
          setActiveIndex(3)
          break;
        default:
          break 
      }
    }
  }, [])

  const onPageChange = (activeIndex) => {
    setActiveIndex(activeIndex)
    retrieveData()
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
        backgroundColor: Color.white,
        width: '100%',
        height: 140
      }}>
        <View style={[BasicStyles.paginationHolder,{
          shadowColor: Color.gray,
        }]}>
          <Pagination
            activeIndex={activeIndex}
            onChange={(index) => onPageChange(index)}
            pages={paginationProps}
          >
          </Pagination>
        </View>
        {/* SEARCHBAR */}
        <View style={Style.searchbarContainer}>
          <TextInput
            style={Style.searchbar}
            placeholder="Search..."
            placeholderTextColor={Color.gray}
            onChangeText={(str) => setSearchString(str)}
          />
          <TouchableOpacity
            style={Style.searchIcon}
            onPress={() => searchProductHandler()}
          >
            <SearchIcon height="50" width="52" />
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.nfcIcon}
            onPress={() => Alert.alert('nfc')}
          >
            <NfcIcon width="35" />
          </TouchableOpacity>
        </View>
      </View>
      <PagerProvider activeIndex={activeIndex}>

        <Pager panProps={{enabled: false}}>
          <View style={Style.sliderContainer}>
            {/* ===== HERBICIDE ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== FUNGICIDE ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== INSECTICIDE ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== OTHER ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading}/>
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

connect(mapStateToProps, mapDispatchToProps)(Inventory);

const InventoryScreen = (props) => {
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="Inventory"
        children={(childProps) => <Inventory {...childProps} parentNav={props.parentNav} />}
        options={() => ({
          headerTitle: () => (
            <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '25%',
                }}>
              <TitleLogo />
              <Text
                style={{
                  color: '#000',
                  marginLeft: 7,
                  fontWeight: 'bold',
                  fontSize: 20
                }}
                >
                INVENTORY
              </Text>
            </View>
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

export default InventoryScreen
