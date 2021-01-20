import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {BasicStyles} from 'common';
import SettingsPage from 'modules/settingsPage';
// assets
import TitleLogo from 'assets/inventory/title_logo.svg';
import StackHeaderTitle from 'modules/generic/StackHeaderTitle';

const SettingsPageStack = createStackNavigator();

const SettingsScreen = props => {
  return (
    <SettingsPageStack.Navigator>
      <SettingsPageStack.Screen
        name="SettingsPage"
        children={route => (
          <SettingsPage
            {...route}
            parentNav={props.parentNav}
            initialPage={props.initialPage}
          />
        )}
        options={({route}) => {
          return {
            headerTitle: () => (
              <StackHeaderTitle title={'SETTINGS'}/>
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
    </SettingsPageStack.Navigator>
  );
};

export default SettingsScreen;
