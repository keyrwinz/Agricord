import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ColorPropType,
} from 'react-native';
import OrderContainer from 'modules/orderDetails/OrderContainer';
import {BasicStyles} from 'common';
import {color} from 'react-native-reanimated';

const dummyData = [
  {
    productName: 'Product X',
    manufacturer: 'Manufacturer',
    quantity: '(110L)',
    numberOfItems: 10,
    status: '#5A84EE',
  },
  {
    productName: 'Product Y',
    manufacturer: 'Manufacturer',
    quantity: '(20kg)',
    numberOfItems: 3,
    status: '#5A84EE',
  },
  {
    productName: 'Product Z',
    manufacturer: 'Manufacturer',
    quantity: '',
    numberOfItems: 0,
    status: '#FF6262',
  },
];

class OrderDetails extends Component {
  renderProducts = () => {
    return dummyData.map((data, index) => {
      return (
        <OrderContainer height={80} key={index}>
          <View style={styles.ProductContainer}>
            <View style={styles.ProductDetailsContainer}>
              <Text style={styles.ProductNameTextStyle}>
                {data.productName}
              </Text>
              <View style={styles.ProductDataContainer}>
                <Text
                  style={[
                    styles.ProductManufacturerTextStyle,
                    {color: '#B0B0B0'},
                  ]}>
                  {data.manufacturer}
                </Text>
                <Text
                  style={[styles.ProductQuantityTextStyle, {color: '#5A84EE'}]}>
                  {data.quantity}
                </Text>
              </View>
            </View>
            <View style={styles.ProductNumberOfItemsContainer}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: data.status,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
                <Text style={styles.ProductNumberOfItemsTextStyle}>
                  {data.numberOfItems}
                </Text>
              </View>
            </View>
          </View>
        </OrderContainer>
      );
    });
  };

  render() {
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={styles.BackgroundContainer}>
        <View style={styles.OrderDetailsContainer}>
          <OrderContainer title="Coastal Ag Supplies" height={140}>
            <View style={styles.Details}>
              <View style={styles.DetailsTitleContainer}>
                <Text style={styles.DetailsTextStyle}>Delivery Due</Text>
              </View>
              <View style={styles.DetailsTextContainer}>
                <Text style={[styles.DetailsTextStyle, {color: '#000000'}]}>
                  03/02/2020
                </Text>
              </View>
            </View>
            <View style={styles.Details}>
              <View style={styles.DetailsTitleContainer}>
                <Text style={styles.DetailsTextStyle}>Order</Text>
              </View>
              <View style={styles.DetailsTextContainer}>
                <Text style={[styles.DetailsTextStyle, {color: '#000000'}]}>
                  CAS0000078
                </Text>
              </View>
            </View>
          </OrderContainer>
          {this.renderProducts()}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  BackgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    elevation: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  OrderDetailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
  },
  Details: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 0.5,
  },
  DetailsTitleContainer: {
    width: '60%',
  },
  DetailsTitleTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: '#969696',
  },
  DetailsTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
    color: '#969696',
  },
  DetailsTextContainer: {
    width: '40%',
  },
  ProductContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  ProductDetailsContainer: {
    width: '60%',
  },
  ProductNameTextStyle: {
    fontWeight: 'bold',
    fontSize: BasicStyles.titleText.fontSize,
  },
  ProductDataContainer: {
    flexDirection: 'row',
  },
  ProductManufacturerTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
  },
  ProductQuantityTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
  },
  ProductNumberOfItemsContainer: {
    width: '40%',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  ProductNumberOfItemsTextStyle: {
    color: '#FFFFFF',
    fontSize: BasicStyles.titleText.fontSize,
    fontWeight: 'bold',
  },
});

export default OrderDetails;
