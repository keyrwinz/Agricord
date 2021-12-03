import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ColorPropType,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import OrderContainer from 'modules/orderDetails/OrderContainer';
import {BasicStyles, Routes} from 'common';
import {color} from 'react-native-reanimated';
import Api from 'services/api';
import {connect} from 'react-redux';
import {Spinner} from 'components';
import styles from 'modules/orderDetails/Styles.js';
import TaskIcon from 'components/Products/TaskIcon.js';
import TaskButton from 'modules/generic/TaskButton.js';
import ProductCard from 'components/Products/thumbnail/ProductCard.js';
import _ from "lodash"
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      scannedProducts: 0,
      showOverlay: false
    };
  }

  componentDidMount() {
    this.getOrderDetails();
  }

  getOrderDetails = () => {
    const {selectedOrder} = this.props.state;
    let parameters = {
      condition: [{
        value: selectedOrder.id,
        column: 'order_request_id',
        clause: '='
      }]
    };
    this.setState({isLoading: true});
    Api.request(Routes.orderRequest, parameters, response => {
      this.setState({products: response.data, isLoading: false});
      this.sumProducts();
    }, error => {
      this.setState({
        products: [],
        isLoading: false
      })
    });
  };

  async sumProducts(){
    let qty = _.sumBy(this.state.products, function(el){
      return parseInt(el.qty)
    })
    await this.setState({scannedProducts: qty})
  }

  _renderProducts = () => {
    return this.state.products.map((product, index) => {
      return (
        <OrderContainer height={73} key={index}>
          {this.state.isLoading ? <Spinner mode="overlay" /> : null}
          <View style={styles.ProductContainer}>
            <View style={styles.ProductDetailsContainer}>
              <Text style={styles.ProductNameTextStyle}>{product.title}</Text>
              <View style={styles.ProductDataContainer}>
                <Text
                  style={[
                    styles.ProductManufacturerTextStyle,
                    {color: '#B0B0B0'},
                  ]}>
                  {product.merchant}
                </Text>
              </View>
            </View>
            <View style={styles.ProductNumberOfItemsContainer}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: '#5A84EE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                  borderColor: '#4570DD',
                }}>
                <Text style={styles.ProductNumberOfItemsTextStyle}>
                  {this.state.qty}
                </Text>
              </View>
            </View>
          </View>
        </OrderContainer>
      );
    });
  };


  renderProducts = () => {
    return this.state.products.map((item, index) => {
      return (
        <ProductCard
          item={{
            ...item,
            from: 'order'
          }}
          key={item.id}
          navigation={this.props.navigation}
          theme={'v3'}
        />
      );
    });
  };

  render() {
    const {selectedOrder} = this.props.state;
    console.log(selectedOrder, "===========iiii");
    const {parentNav} = this.props.navigation.state.params;
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={styles.BackgroundContainer}>
        {/* <View style={styles.OrderDetailsContainer}> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            height: '100%',
            width: '90%',
            alignItems: 'center',
            // marginBottom: 100,
            marginLeft: '5%',
            marignRight: '5%',
            marginTop: 15
        }}>
            <OrderContainer
              title={selectedOrder.merchant_from.name}
              height={selectedOrder.status === 'pending' ? 140 : 180}>
              <View style={styles.Details}>
                <View style={styles.DetailsTitleContainer}>
                  <Text style={styles.DetailsTextStyle}>
                    {'Allocated To'}
                  </Text>
                </View>
                <View style={styles.DetailsTextContainer}>
                  <Text style={[styles.DetailsTextStyle, {color: '#000000'}]} numberOfLines={1}>
                    {selectedOrder.name}
                  </Text>
                </View>
              </View>
              <View style={styles.Details}>
                <View style={styles.DetailsTitleContainer}>
                  <Text style={styles.DetailsTextStyle}>
                    {selectedOrder.status === 'completed'
                      ? 'Delivery Date'
                      : 'Delivery Due'}
                  </Text>
                </View>
                <View style={styles.DetailsTextContainer}>
                  <Text style={[styles.DetailsTextStyle, {color: '#000000'}]} numberOfLines={1}>
                    {selectedOrder.status === 'completed'
                      ? selectedOrder.delivered_date
                      : selectedOrder.date_of_delivery_with_time}
                  </Text>
                </View>
              </View>
              {selectedOrder.status === 'pending' ? null : (
                <View style={styles.Details}>
                  <View style={styles.DetailsTitleContainer}>
                    <Text style={styles.DetailsTextStyle}>
                      Status
                    </Text>
                  </View>
                  <View style={styles.DetailsTextContainer}>
                    <Text
                      style={[styles.DetailsTextStyle, {color: '#000000'}]} numberOfLines={1}>
                      {selectedOrder.status}
                    </Text>
                  </View>
                </View>
              )}
            </OrderContainer>
            {this.renderProducts()}
          </View>
        </ScrollView>

        <TaskButton navigation={this.props.parentNav} showOverlay={(bool) => this.setState({showOverlay: bool})}/>
        {
          this.state.showOverlay && (
            <View style={{
               flex: 1,
               position: 'absolute',
               left: 0,
               top: 0,
               opacity: 0.7,
               backgroundColor: 'white',
               width: width,
               height: height
            }}></View>
          )
        }
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
      </ImageBackground>
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
)(OrderDetails);
