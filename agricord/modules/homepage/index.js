import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationActions, StackActions } from 'react-navigation';
// import Setting from './Setting';
import Setting from 'modules/accountSettings'
import Order from './Order';
import Home from './Home';
import InventoryScreen from 'modules/inventory';
// import Tasks from 'modules/tasks';
import Task from './Task';

import SettingIcon from 'assets/btm_nav/setting.svg';
import OrderIcon from 'assets/btm_nav/order.svg';
import HomeIcon from 'assets/btm_nav/home.svg';
import InventoryIcon from 'assets/btm_nav/inventory.svg';
import TaskIcon from 'assets/btm_nav/task.svg';

const Tab = createBottomTabNavigator();

export default function Homepage(props) {
  return (
    <NavigationContainer
    >
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#81CB9C',
          style: {
            height: '12%'
          },
          labelPosition: 'below-icon',
          tabStyle: {
            marginTop: '2%',
            marginBottom: '2%'
          }
        }}
      >
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: "Setting",
            tabBarIcon: () => <SettingIcon />,
          }}
          listeners={() => ({
            tabPress: () => {
              const navigateAction = NavigationActions.navigate({
                routeName: 'drawerStack',
                action: StackActions.reset({
                  index: 0,
                  key: null,
                  actions: [
                      NavigationActions.navigate({ routeName: 'AccountSettings' }),
                  ]
                })
              });
          
              props.navigation.dispatch(navigateAction);
            }
          })}
        />
        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            tabBarLabel: "Order",
            tabBarIcon: () => <OrderIcon />,
          }}
          listeners={() => ({
            tabPress: () => {
              const navigateAction = NavigationActions.navigate({
                routeName: 'drawerStack',
                action: StackActions.reset({
                  index: 0,
                  key: null,
                  actions: [
                      NavigationActions.navigate({ routeName: 'UpcomingOrders' }),
                  ]
                })
              });
          
              props.navigation.dispatch(navigateAction);
            }
          })}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => <HomeIcon style={{ marginTop: 10 }} />,
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{
            tabBarLabel: "Inventory",
            tabBarIcon: () => <InventoryIcon />,
          }}
        />
        <Tab.Screen
          name="Task"
          component={Task}
          options={{
            tabBarLabel: "Task",
            tabBarIcon: () => <TaskIcon />,
          }}
          listeners={() => ({
            tabPress: () => {
              const navigateAction = NavigationActions.navigate({
                routeName: 'drawerStack',
                action: StackActions.reset({
                  index: 0,
                  key: null,
                  actions: [
                      NavigationActions.navigate({ routeName: 'TaskInProgress' }),
                  ]
                })
              });
          
              props.navigation.dispatch(navigateAction);
            }
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
