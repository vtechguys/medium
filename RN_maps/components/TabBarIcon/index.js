import React from 'react';

import { Icon } from '../../UI';
import styles from './styles';

import Colors from '../../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Icon
      name={props.name}
      size={26}
      style={styles.iconTabBar}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

