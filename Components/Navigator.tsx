import React from 'react';
// import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Account from '../Screens/Account';
import Statistics from '../Screens/Statistics';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
export interface NavProps {
  navigation: any;
  route: any;
}

const Navigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Statistics') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Statistics" component={Statistics} />
    </Tab.Navigator>
  );
};

export default Navigator;

// const styles = StyleSheet.create({});
