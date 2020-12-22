import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import Style from './OrderCardStyle';
import {connect} from 'react-redux';

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setOrder = () => {
    const {setSelectedOrder} = this.props;
    const selectedOrder = this.props.details;
    setSelectedOrder(selectedOrder);
  };

  render() {
    const {details, theme} = this.props;
    return (
      <TouchableOpacity
        style={{alignItems: 'center', width: '100%'}}
        onPress={() => {
          this.setOrder();
          this.props.parentNav.navigate('orderDetailsStack', {
            details: this.props.details,
          });
        }}>
        <View style={Style.paddockContainer}>
          <View style={Style.paddockInfo}>
            <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
              <View
                style={{
                  marginTop: 6,
                  marginRight: 10,
                  width: 10,
                  height: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: '#D3E584',
                }}
              />
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                {this.props.details.merchant_to.name}
              </Text>
            </View>

            <View style={Style.cardInfo}>
              {this.props.details.status == 'pending' ? (
                <Text
                  style={{fontWeight: 'bold', color: '#969696', width: '50%'}}>
                  Delivery Due
                </Text>
              ) : (
                <Text
                  style={{fontWeight: 'bold', color: '#969696', width: '50%'}}>
                  Delivered
                </Text>
              )}
              {this.props.details.status == 'pending' ? (
                <Text>{this.props.details.date_of_delivery}</Text>
              ) : (
                <Text>{this.props.details.delivered_date}</Text>
              )}
            </View>
            <Divider style={{height: 1, marginLeft: 15, marginRight: 15}} />
            <View style={Style.cardInfo}>
              <Text
                style={{fontWeight: 'bold', color: '#969696', width: '50%'}}>
                Ordered
              </Text>
              <Text>{this.props.details.order_number}</Text>
            </View>
            <Divider
              style={{
                height: 1,
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 20,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setSelectedOrder: selectedOrder => {
      dispatch(actions.setSelectedOrder(selectedOrder));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderCard);
