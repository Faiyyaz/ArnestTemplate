import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import React from 'react';
import {SegmentedButtons} from 'react-native-paper';

export default function RNPTabBar({navigation, state}: MaterialTopTabBarProps) {
  return (
    <SegmentedButtons
      value={state.routeNames[state.index]}
      onValueChange={value => navigation.navigate(value)}
      buttons={state.routeNames.map(route => ({
        value: route,
        label: route,
      }))}
    />
  );
}
