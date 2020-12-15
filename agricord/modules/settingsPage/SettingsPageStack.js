import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Order from './index';
import ApplyTask from 'modules/applyTask';
import SettingsPage from 'modules/settingsPage';
// assets
import TitleLogo from 'assets/inventory/title_logo.svg';

const SettingsPageStack = createStackNavigator();

const SettingsScreen = props => {
  return (
    <SettingsPageStack.Navigator>
      <SettingsPageStack.Screen
        name="SettingsPage"
        children={route => (
          <SettingsPage {...route} initialPage={props.initialPage} />
        )}
        options={({route}) => {
          return {
            headerTitle: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  SETTINGS
                </Text>
              </View>
            ),
          };
        }}
      />
    </SettingsPageStack.Navigator>
  );
};

export default SettingsScreen;
