import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStar,
  faStopwatch,
  faCircle,
  faPlay,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import {Divider} from 'react-native-elements';
import {Color} from 'common';
import Config from 'src/config.js';
import Style from './OrderCardStyle';

class OrderCard extends Component {
  render() {
    const {details, theme} = this.props;
    return (
      <View style={{alignItems: 'center', width: '100%'}}>
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
      </View>
    );
  }
}

export default OrderCard;
