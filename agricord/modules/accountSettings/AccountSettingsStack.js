import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { BasicStyles } from 'common';
import Setting from './index';

const AccountSettingStack = createStackNavigator()

const AccountSettingScreen = (props) => {
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
                  SETTINGS
                </Text>
              </View>
            ),
            headerLeft: () => (
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.parentNav.toggleDrawer()}>
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
          })
        }}
      />
    </AccountSettingStack.Navigator>
  )
}

export default AccountSettingScreen
