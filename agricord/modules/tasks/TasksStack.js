import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Tasks from './index';

// assets
import TitleLogo from 'assets/inventory/title_logo.svg';

const TasksStack = createStackNavigator()

const TasksScreen = (props) => {
  console.log("check",props)
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
            )
          })
        }}
      />
    </TasksStack.Navigator>
  )
}

export default TasksScreen
