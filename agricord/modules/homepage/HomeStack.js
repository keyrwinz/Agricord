import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {createStackNavigator} from '@react-navigation/stack';
import User from 'components/User/Image'
import {BasicStyles, Color} from 'common';
import Homepage from './Home';
import {connect} from 'react-redux';
import Style from './HomeStyle'
import StackHeaderTitle from 'modules/generic/StackHeaderTitle';

// assets
import TitleLogo from 'assets/inventory/title_logo.svg';
import { UrlTile } from 'react-native-maps';
import { uri } from 'react-native-nfc-manager/ndef-lib';

const HomeStack = createStackNavigator();

const HomeScreen = props => {
  const {selectedOrder, user} = props.state;
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomePage"
        children={route => (
          <Homepage
            {...route}
            parentNav={props.parentNav}
            initialPage={props.initialPage}
          />
        )}
        options={({route}) => {
          return {
            headerTitle: '',
            headerStyle: {
              position: 'absolute',
              backgroundColor: '#c9e49d',
              elevation: 0,
              height: Platform.OS == 'ios' ? 50 : 50
            },
            headerLeft: () => (
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => props.parentNav.toggleDrawer()}>
                  <FontAwesomeIcon
                    icon={faBars}
                    size={30}
                    style={[
                      BasicStyles.iconStyle,
                      {
                        color: '#fff',
                        marginLeft:10
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerRight: () => (
              <View style={{padding:10, marginTop:10}}>
                <User user={{
                  ...user,
                  profile: user?.account_profile
                }} color={'white'} size={30} style={{...Style.image, marginBottom: 10}}/>
              </View>
            )
          };
        }}
      />
    </HomeStack.Navigator>
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
)(HomeScreen);
