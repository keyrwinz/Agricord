import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {BasicStyles} from 'common';
import Order from './index';
import {connect} from 'react-redux';

// assets
import TitleLogo from 'assets/inventory/title_logo.svg';

const OrderStack = createStackNavigator();

const OrderScreen = props => {
  const {selectedOrder} = props.state;
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Orders"
        children={route => (
          <Order
            {...route}
            parentNav={props.parentNav}
            initialPage={props.initialPage}
          />
        )}
        options={({route}) => {
          return {
            headerTitle: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '25%',
                }}>
                <TitleLogo />
                <Text
                  style={{
                    color: '#000',
                    marginLeft: 7,
                    fontWeight: 'bold',
                    fontSize: 20,
                    letterSpacing: 3,
                  }}>
                  ORDERS
                </Text>
              </View>
            ),
            headerLeft: () => (
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => props.parentNav.toggleDrawer()}>
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
          };
        }}
      />
    </OrderStack.Navigator>
  );
};

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderScreen);
