import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import Pagination from 'components/Pagination';
import Herbicide from './Herbicide'
import { Color } from 'common';
import { products } from './data-test.js';
import Style from './Style.js';

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

const Inventory = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [searchString, setSearchString] = useState('')
  const [HerbicideData, setHerbicideData] = useState(products)
  const [FungicideData, setFungicideData] = useState(products)
  const [InsecticideData, setInsecticideData] = useState(products)
  const [OtherData, setOtherData] = useState(products)

  const onPageChange = (activeIndex) => setActiveIndex(activeIndex)
  const searchProductHandler = () => {
    const query = searchString.toLocaleLowerCase()
    switch (activeIndex) {
      case 0: // HERBICIDE
        const data1 = products.filter(obj => obj.title.toLocaleLowerCase().indexOf(query) >= 0)
        console.log({ query, activeIndex, data1 })
        setHerbicideData(data1)
        break
      case 1: // FUNGICIDE
        const data2 = products.filter(obj => obj.title.toLocaleLowerCase().indexOf(query) >= 0)
        setFungicideData(data2)
        break
      case 2: // INSECTICIDE
        const data3 = products.filter(obj => obj.title.toLocaleLowerCase().indexOf(query) >= 0)
        setInsecticideData(data3)
        break
      case 3: // OTHER
        const data4 = products.filter(obj => obj.title.toLocaleLowerCase().indexOf(query) >= 0)
        setOtherData(data4)
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
            <SearchIcon height="50" width="50" />
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
            <Herbicide data={HerbicideData} />
          </View>
          <View style={Style.sliderContainer}>
            <Herbicide data={FungicideData}/>
          </View>
          <View style={Style.sliderContainer}>
            <Herbicide data={InsecticideData}/>
          </View>
          <View style={Style.sliderContainer}>
            <Herbicide data={OtherData}/>
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

const InventoryScreen = () => {
  const navigation = useNavigation()
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="Inventory"
        component={Inventory}
        options={({ route }) => {
          return ({
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
            )
          })
        }}
      />
    </InventoryStack.Navigator>
  )
}

export default InventoryScreen
