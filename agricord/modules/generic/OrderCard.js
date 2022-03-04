import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faStopwatch, faCircle, faPlay, faImage } from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'react-native-elements';
import {NavigationActions, StackActions} from 'react-navigation';
import { Color, BasicStyles } from 'common'
import Config from 'src/config.js'
import Style from './OrderCardStyle';
import {connect} from 'react-redux';

class OrderCard extends Component {
  constructor(props) {
    super(props);
  }

  redirect(){
    const { item } = this.props;
    const { setSelectedOrder } = this.props;
    if(item == null){
      return
    }
    setSelectedOrder({
      ...item
    })

    const navigateAction = NavigationActions.navigate({
      routeName: 'orderDetailsStack',
      action: StackActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({routeName: 'orderDetailsStack'}),
        ],
        params: {
          data: {
            ...item
          }
        }
      })
    });
    this.props.navigation.dispatch(navigateAction);

    // this.props.navigation.navigate('orderDetailsStack', {
    //   data: {
    //     ...item
    //   }
    // })
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        style={Style.cardContainer}
        onPress={() => this.redirect()}
        >
        {
          item && (
            <View style={{
              width: '100%',
              paddingLeft: 10,
              paddingRight: 10
            }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: 6,
                    marginRight: 10,
                    width: 10,
                    height: 10,
                    borderRadius: 100 / 2,
                    backgroundColor: item.from == 'pending' ? Color.primary : Color.blue,
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    width: '90%',
                    fontSize: BasicStyles.standardTitleFontSize
                  }}
                  numberOfLines={1}>
                    {item.merchant_from.name}
                  </Text>
              </View>

              <View style={Style.cardInfo}>
              {
                item.from == 'pending' ? (
                  <Text style={Style.labelTitle} numberOfLines={1}>
                    Delivery Due
                  </Text>
                ) : (
                  <Text style={Style.labelTitle} numberOfLines={1}>
                    Delivered
                  </Text>
                )
              }
              {
                item.from == 'pending' || item.from == 'in_progress' ? (
                  <Text style={Style.label} numberOfLines={1}>{item.date_of_delivery_formatted}</Text>
                ) : (
                  <Text style={Style.label} numberOfLines={1}>
                    {item.delivered_date_formatted}
                  </Text>
                )
              }
            </View>
            <Divider style={BasicStyles.starndardDivider} />
            <View style={Style.cardInfo}>
              <Text style={Style.labelTitle}>
                Order
              </Text>
              <Text style={Style.label} numberOfLines={1}>{item.order_number}</Text>
            </View>
            <Divider style={BasicStyles.starndardDivider} />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setSelectedOrder: (order) => dispatch(actions.setSelectedOrder(order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderCard);
