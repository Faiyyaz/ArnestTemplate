import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import RNPTabBar from '../components/common/RNPTabbar';
import {useTheme} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();

  function buildTabBar(props: MaterialTopTabBarProps) {
    return <RNPTabBar {...props} />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarContentContainerStyle: {backgroundColor: theme.colors.background},
      }}
      tabBar={buildTabBar}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}
