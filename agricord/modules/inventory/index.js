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
import Pagination from 'components/Pagination';
import InventoryItem from './InventoryItem';
import Herbicide from './Herbicide'
import { Color, BasicStyles, Routes } from 'common';
import Api from 'services/api/index.js'
import { products } from './data-test.js';
import Style from './Style.js';
import ApplyTask from 'modules/applyTask';

// assets
import TitleLogo from 'assets/inventory/title_logo.svg';
import SearchIcon from 'assets/inventory/search_icon.svg';
import NfcIcon from 'assets/inventory/nfc_icon.svg';

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
  const [searchString, setSearchString] = useState('')
  const [HerbicideData, setHerbicideData] = useState([])
  const [FungicideData, setFungicideData] = useState([])
  const [InsecticideData, setInsecticideData] = useState([])
  const [OtherData, setOtherData] = useState([])

  const [filteredHerbicideData, setFilteredHerbicideData] = useState([])
  const [filteredFungicideData, setFilteredFungicideData] = useState([])
  const [filteredInsecticideData, setFilteredInsecticideData] = useState([])
  const [filteredOtherData, setFilteredOtherData] = useState([])

  useEffect(() => {
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
    Api.request(Routes.inventoryRetrieve, parameter, response => {
      if (response.data.length) {
        setHerbicideData(response.data)
        setFungicideData(response.data)
        setInsecticideData(response.data)
        // setOtherData(response.data)

        setFilteredHerbicideData(response.data)
        setFilteredFungicideData(response.data)
        setFilteredInsecticideData(response.data)
        // setFilteredOtherData(response.data)
      }
      console.log({ inventoryResponse: response })
    }, error => {
      console.log({ inventoryError: error })
    })
  }, [])

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

  const onPageChange = (activeIndex) => setActiveIndex(activeIndex)
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
      <Pagination
        activeIndex={activeIndex}
        onChange={(index) => onPageChange(index)}
        pages={paginationProps}
      >
      </Pagination>
      <PagerProvider activeIndex={activeIndex}>

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

        <Pager panProps={{enabled: false}}>
          <View style={Style.sliderContainer}>
            <Herbicide navigation={props.navigation} data={filteredHerbicideData} />
          </View>
          <View style={Style.sliderContainer}>
            <Herbicide navigation={props.navigation} data={filteredFungicideData} />
          </View>
          <View style={Style.sliderContainer}>
            <Herbicide navigation={props.navigation} data={filteredInsecticideData} />
          </View>
          <View style={Style.sliderContainer}>
            <Herbicide navigation={props.navigation} data={filteredOtherData} />
          </View>
        </Pager>
      </PagerProvider>
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
        children={() => <Inventory {...props} />}
        options={() => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      <InventoryStack.Screen
        name="InventoryItem"
        component={InventoryItem}
      />
      <InventoryStack.Screen
        name="ApplyTask"
        component={ApplyTask}
        options={({ navigation }) => {
          return ({
            headerLeft: () => (
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
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
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16,textAlign:'center' }}>
                 APPLY TASK
                </Text>
             
              </View>
            )
        })}}
      />
    </InventoryStack.Navigator>
  )
}

export default InventoryScreen
