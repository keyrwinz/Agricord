import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from './index';

const AccountSettingStack = createStackNavigator()

const AccountSettingScreen = () => {
  return (
    <AccountSettingStack.Navigator>
      <AccountSettingStack.Screen
        name="AccountSetting"
        component={Setting}
        options={({ route }) => {
          return ({
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#000',
                    marginLeft: 7,
                    fontWeight: 'bold',
                    fontSize: 20
                  }}
                  >
                  Account Settings
                </Text>
              </View>
            )
          })
        }}
      />
    </AccountSettingStack.Navigator>
  )
}

export default AccountSettingScreen
