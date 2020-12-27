import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {BasicStyles} from 'common';
import Tasks from './index';
import MixName from 'modules/mixName';
import {connect} from 'react-redux';

// assets
import TitleLogo from 'assets/inventory/title_logo.svg';

const TasksStack = createStackNavigator();

const TasksScreen = props => {
  return (
    <TasksStack.Navigator>
      <TasksStack.Screen
        name="Tasks"
        children={route => (
          <Tasks
            {...route}
            parentNav={props.parentNav}
            initialPage={props.initialPage}
          />
        )}
        options={({route}) => {
          return {
            headerTitle: () => (
              <View style={{
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
                  }}>
                  TASKS
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
      
    </TasksStack.Navigator>
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
)(TasksScreen);
