import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

// Screens
import RideScreen from '../screens/RideScreen';
import FoodScreen from '../screens/FoodScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const RideStack = createStackNavigator(
  {
    Ride: RideScreen,
  },
  config
);

RideStack.navigationOptions = {
  tabBarLabel: 'Ride',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='car'/>
  ),
};
RideStack.path = '';


const FoodStack = createStackNavigator(
  {
    Food: FoodScreen,
  },
  config
);

FoodStack.navigationOptions = {
  tabBarLabel: 'Food',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='pizza'/>
  ),
};

FoodStack.path = '';

// pack into a bottom tab based navigation 
const tabNavigator = createBottomTabNavigator({
  RideStack,
  FoodStack
});

tabNavigator.path = '';

export default tabNavigator;
