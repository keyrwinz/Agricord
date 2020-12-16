import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {BasicStyles} from 'common';
import OrderDetails from 'modules/orderDetails';

const OrderDetailsStack = createStackNavigator();
const OrderDetailsScreen = props => {
  return (
    <OrderDetailsStack.Navigator>
      <OrderDetailsStack.Screen
        name="Orders"
        children={route => (
          <OrderDetails {...route} initialPage={props.initialPage} />
        )}
        options={({route}) => {
          return {
            headerTitle: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#000',
                    marginLeft: 7,
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  ORDER DETAILS
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
    </OrderDetailsStack.Navigator>
  );
};

export default OrderDetailsScreen;
