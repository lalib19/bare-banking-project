/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import Navigator from './Components/Navigator';
import Home from './Screens/Home';
import GrossRegister from './Screens/GrossRegister';
import SpendingRegister from './Screens/SpendingRegister';
import Account from './Screens/Account';

export type RouteParams = {
  Home: undefined;
  Navigator: undefined;
  GrossRegister: undefined;
  SpendingRegister: undefined;
  Account: undefined;
  Statistics: undefined;
};


const Stack = createNativeStackNavigator<RouteParams>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Navigator"
          component={Navigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="GrossRegister"
          component={GrossRegister}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="SpendingRegister"
          component={SpendingRegister}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
