import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';


import ScannerScreen from '../screens/ScannerScreen';
import DecodeScreen from '../screens/DecodeScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ScannerStack = createStackNavigator(
  {
    Scanner: ScannerScreen,
  },
  config
);

ScannerStack.navigationOptions = {
  tabBarLabel: 'Scan',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-qr-scanner`
          : 'md-qr-scanner'
      }
    />
  ),
};

ScannerStack.path = '';

const DecodeStack = createStackNavigator(
  {
    Decode: DecodeScreen,
  },
  config
);

DecodeStack.navigationOptions = {
  tabBarLabel: 'Decode',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-code' : 'md-code'} />
  ),
};

DecodeStack.path = '';


const tabNavigator = createBottomTabNavigator({
  ScannerStack,
  DecodeStack,
});

tabNavigator.path = '';

export default tabNavigator;
