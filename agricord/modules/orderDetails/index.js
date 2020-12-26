import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ColorPropType,
  ScrollView,
  Image,
  TouchableOpacity,
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

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getOrderDetails();
  }

  getOrderDetails = () => {
    const {selectedOrder} = this.props.state;
    let parameters = {
      merchant_id: selectedOrder.merchant.id,
      status: selectedOrder.status,
      order_id: selectedOrder.order_number,
    };
    this.setState({isLoading: true});
    Api.request(Routes.orderRequest, parameters, response => {
      this.setState({products: response.data, isLoading: false});
    });
  };

  renderProducts = () => {
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
                  {product.qty}
                </Text>
              </View>
            </View>
          </View>
        </OrderContainer>
      );
    });
  };

  render() {
    const {selectedOrder} = this.props.state;
    const {parentNav} = this.props.navigation.state.params;
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={styles.BackgroundContainer}>
        <View style={styles.OrderDetailsContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
              <OrderContainer
                title="Coastal Ag Supplies"
                height={selectedOrder.status === 'pending' ? 140 : 180}>
                <View style={styles.Details}>
                  <View style={styles.DetailsTitleContainer}>
                    <Text style={styles.DetailsTextStyle}>
                      {selectedOrder.status === 'pending'
                        ? 'Delivery Due'
                        : 'Delivered By'}
                    </Text>
                  </View>
                  <View style={styles.DetailsTextContainer}>
                    <Text style={[styles.DetailsTextStyle, {color: '#000000'}]}>
                      {selectedOrder.status === 'pending'
                        ? selectedOrder.date_of_delivery
                        : selectedOrder.delivered_by}
                    </Text>
                  </View>
                </View>
                <View style={styles.Details}>
                  <View style={styles.DetailsTitleContainer}>
                    <Text style={styles.DetailsTextStyle}>
                      {selectedOrder.status === 'pending'
                        ? 'Order'
                        : 'Delivery Date'}
                    </Text>
                  </View>
                  <View style={styles.DetailsTextContainer}>
                    <Text style={[styles.DetailsTextStyle, {color: '#000000'}]}>
                      {selectedOrder.status === 'pending'
                        ? selectedOrder.order_number
                        : selectedOrder.delivered_date}
                    </Text>
                  </View>
                </View>
                {selectedOrder.status === 'pending' ? null : (
                  <View style={styles.Details}>
                    <View style={styles.DetailsTitleContainer}>
                      <Text style={styles.DetailsTextStyle}>
                        Product Scanned
                      </Text>
                    </View>
                    <View style={styles.DetailsTextContainer}>
                      <Text
                        style={[styles.DetailsTextStyle, {color: '#000000'}]}>
                        {this.state.products.length}
                      </Text>
                    </View>
                  </View>
                )}
              </OrderContainer>
              {this.renderProducts()}
            </View>
          </ScrollView>
        </View>

        <TaskButton navigation={this.props.navigation}/>
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
