import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ProductCard from 'components/Products/thumbnail/ProductCard.js';
import Style from './Style.js';

const height = Math.round(Dimensions.get('window').height);

const InventoryList = (props) => {
  const { loading } = props;
  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      <ScrollView 
        onScroll={(event) => {
          let scrollingHeight = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y
          let totalHeight = event.nativeEvent.contentSize.height
          if(event.nativeEvent.contentOffset.y <= 0) {
            if(loading == false){
              // this.retrieve(false)
            }
          }
          if(scrollingHeight >= (totalHeight)) {
            if(loading == false){
              props.retrieve(true)
            }
          }
        }}
        showsVerticalScrollIndicator={false}>
        <View style={Style.MainContainer, { minHeight: height }}>
          {
            !props.loading && (
              <Text style={{ fontWeight:'bold', fontSize: 20 }}>
                Product
              </Text>
            ) 
          }
          {
            props.data != null && props.data.length ? props.data.map((item, idx) => {
              return (
                <ProductCard item={{
                    ...item,
                    from: 'inventory',
                    qty: item.qty
                  }}
                  key={item.id}
                  navigation={props.parentNav}
                  theme={'v1'}
                />
              )}) : (
                <Text style={{ marginTop: 10 }}>{props.loading ? '' : 'No product found'}</Text>
              )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryList);
