import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationActions, StackActions} from 'react-navigation';
// import Setting from './Setting';
import Order from 'modules/orders/OrdersStack.js';
import Home from './HomeStack';
import InventoryScreen from 'modules/inventory';
import Tasks from 'modules/tasks/TasksStack';
import SettingsScreen from 'modules/settingsPage/SettingsPageStack.js';

import SettingIcon from 'assets/btm_nav/setting.svg';
import OrderIcon from 'assets/btm_nav/order.svg';
import HomeIcon from 'assets/btm_nav/home.svg';
import InventoryIcon from 'assets/btm_nav/inventory.svg';
import TaskIcon from 'assets/btm_nav/task.svg';

const Tab = createBottomTabNavigator();

export default function Homepage(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={
          props.navigation.state.params != null
            ? props.navigation.state.params.initialRouteName
            : 'Home'
        }
        tabBarOptions={{
          activeTintColor: '#81CB9C',
          style: {
            height: '12%',
          },
          labelPosition: 'below-icon',
          tabStyle: {
            marginTop: '2%',
            marginBottom: '2%',
          },
        }}>
        <Tab.Screen
          name="Settings"
          children={route => (
            <SettingsScreen
              {...route}
              initialPage={props.navigation.state.routeName}
              parentNav={props.navigation}
            />
          )}
          options={{
            tabBarLabel: 'SETTINGS',
            tabBarIcon: () => <SettingIcon />,
          }}
        />
        <Tab.Screen
          name="Orders"
          children={route => (
            <Order
              {...route}
              initialPage={props.navigation.state.routeName}
              parentNav={props.navigation}
            />
          )}
          options={{
            tabBarLabel: 'ORDERS',
            tabBarIcon: () => <OrderIcon />,
          }}
        />
        <Tab.Screen
          name="Home"
          children={route => <Home {...route} initialPage={props.navigation.state.routeName} parentNav={props.navigation} />}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => <HomeIcon style={{marginTop: 10}} />,
          }}
        />
        <Tab.Screen
          name="INVENTORY"
          children={route => (
            <InventoryScreen
              {...route}
              initialPage={props.navigation.state.routeName}
              parentNav={props.navigation}
            />
          )}
          options={(inventoryScreenProps) => {
            const { route: { state } } = inventoryScreenProps
            const routes = state?.routes || null

            let options = {
              tabBarLabel: 'INVENTORY',
              tabBarIcon: () => <InventoryIcon />,
            }
            
            if (routes) {
              const lastScreenIndex = routes.length - 1
              if (routes[lastScreenIndex].name === 'InventoryItem') {
                options.tabBarVisible = false
              }
            }
            return options
          }}
        />
        <Tab.Screen
          name="TASKS"
          children={route => (
            <Tasks
              {...route}
              initialPage={props.navigation.state.routeName}
              parentNav={props.navigation}
            />
          )}
          options={{
            tabBarLabel: 'TASKS',
            tabBarIcon: () => <TaskIcon />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
