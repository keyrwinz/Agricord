import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { BasicStyles } from 'common';
import Tasks from './index';
import TasksItem from 'modules/paddockPage';
import ApplyTask from 'modules/applyTask';
import MixName from 'modules/mixName';

// assets
import TitleLogo from 'assets/inventory/title_logo.svg';

const TasksStack = createStackNavigator()

const TasksScreen = (props) => {
  console.log("PROPS HERE",props)
  return (
    <TasksStack.Navigator>
      <TasksStack.Screen
        name="Tasks"
        children={(route)=><Tasks {...route} initialPage={props.initialPage}/>}
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
                  TASKS
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
      <TasksStack.Screen
        name="TasksItem"
        component={TasksItem}
        options={({ route }) => ({
            headerLeft: null,
            headerTitle: () => (
              
              <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16,textAlign:'center' }}>
                  {route.params.name}
                </Text>
             
              </View>
            )
        })}
      />
         <TasksStack.Screen
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
         <TasksStack.Screen
        name="MixName"
        component={MixName}
        options={({ route }) => ({
            headerLeft: null,
            headerTitle: () => (
              
              <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16,textAlign:'center' }}>
                 {route.params.details.status=="inprogress"? "Mix Name" : "Spray Mix"}
                </Text>
             
              </View>
            )
        })}
      />
    </TasksStack.Navigator>
    
  )
}

export default TasksScreen
