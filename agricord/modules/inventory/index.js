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
  const [activeTags, setActiveTags] = useState('')
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
    retrieve(false)
  }, [])

  const retrieve = (flag) => {
    const parameter = {
      condition: {
        column: 'title',
        value: '%' + searchString.toLocaleLowerCase() + '%'
      },
      sort: {
        title: 'asc'
      },
      merchant_id: props.state.user.sub_account.merchant.id,
<<<<<<< HEAD
      account_id: props.state.user.id,
=======
      account_id: props.state.user.account_information.account_id,
>>>>>>> 2c2b413c849b6e7d7d72f39b61f4ccbe209edc2d
      inventory_type: 'product_trace',
      type: props.state.user.account_type,
      productType: 'all',
      limit: limit,
      offset: flag == true && offset > 0 ? (offset * limit) : offset,
      tags: '%' + activeTags.toLocaleLowerCase() + '%'
    }
    console.log(props.state.user.sub_account.merchant.id, props.state.user.account_information.account_id)
    setLoading(true)
    setData([])
    Api.request(Routes.inventoryRetrieve, parameter, response => {
<<<<<<< HEAD
      console.log();
      if (response.data.length) {
        setLoading(false)
        setData(response.data)
=======
      setLoading(false)
      if (response.data.length > 0) {
        setData(flag == false ? response.data : _.uniqBy([...data, ...response.data], 'id'))
>>>>>>> 2c2b413c849b6e7d7d72f39b61f4ccbe209edc2d
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
<<<<<<< HEAD
      console.log({ inventoryResponse: response })
      setLoading(false)
=======
>>>>>>> 2c2b413c849b6e7d7d72f39b61f4ccbe209edc2d
    }, error => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (props.parentNav.state.params !=null) {
      switch (props.parentNav.state.params.index) {
        case 0:
          setActiveIndex(0)
          setActiveTags('Herbicide')
          break;
        case 1:
          setActiveIndex(1)
          setActiveTags('Fungicide')
          break;
        case 2:
          setActiveIndex(2)
          setActiveTags('Insecticide')
          break;
        case 3:
          setActiveIndex(3)
          setActiveTags('Other')
          break;
        default:
          break 
      }
    }
  }, [])

  const onPageChange = (activeIndex) => {
    setActiveIndex(activeIndex)
    retrieve(false)
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
            onPress={() => retrieve()}
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
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading} retrieve={(flag) => retrieve(flag)}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== FUNGICIDE ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading} retrieve={(flag) => retrieve(flag)}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== INSECTICIDE ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading} retrieve={(flag) => retrieve(flag)}/>
          </View>
          <View style={Style.sliderContainer}>
            {/* ===== OTHER ===== */}
            <InventoryList navigation={props.navigation} parentNav={props.parentNav} data={data} loading={loading} retrieve={(flag) => retrieve(flag)}/>
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

export default InventoryScreen
