import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Order from './index';
import ApplyTask from 'modules/applyTask';


// assets
import TitleLogo from 'assets/inventory/title_logo.svg';

const OrderStack = createStackNavigator()

const OrderScreen = (props) => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Orders"
        children={(route)=><Order {...route} initialPage={props.initialPage}/>}
        options={({ route }) => {
          return ({
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TitleLogo />
                <Text
                  style={{
                    color: '#000',
                    marginLeft: 7,
                    fontWeight: 'bold',
                    fontSize: 20
                  }}
                  >
                  ORDERS
                </Text>
              </View>
            )
          })
        }}
      />
        <OrderStack.Screen
        name="ApplyTask"
        component={ApplyTask}
        options={({ route }) => ({
            headerLeft: null,
            headerTitle: () => (
              
              <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16,textAlign:'center' }}>
                 APPLY TASK
                </Text>
             
              </View>
            )
        })}
      />
    </OrderStack.Navigator>
  )
}

export default OrderScreen
