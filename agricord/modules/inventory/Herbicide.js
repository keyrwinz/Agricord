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
import PaddockCard from 'components/Products/paddockCard.js';
import Style from './Style.js';

const height = Math.round(Dimensions.get('window').height);

const Herbicide = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.MainContainer, { minHeight: height }}>
          <Text style={{ fontWeight:'bold', fontSize: 20 }}>
            Product
          </Text>
          {
            props.data.length ? props.data.map(item => (
              <PaddockCard details={item} key={item.id} />
            )) : (
              <Text style={{ marginTop: 10 }}>No product found</Text>
            )
          }
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'flex-end'
        }}
      >
        <TouchableOpacity onPress={() => Alert.alert('test')}>
          <Image
            style={{
              padding: 30,
              height: 50,
              width:'100%'
            }}
            source={require('../../assets/taskIcon.png')}
          />
        </TouchableOpacity>
      </View>
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
)(Herbicide);
