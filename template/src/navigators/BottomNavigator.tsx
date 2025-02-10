import React from 'react';
import {Icon, useTheme} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import RNPBottomTabbar from '../components/common/RNPBottomTabbar';
import ProductScreen from '../screens/ProductScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const theme = useTheme();

  function buildTabBar(props: BottomTabBarProps) {
    return <RNPBottomTabbar {...props} />;
  }

  function buildHomeIcon(props: {
    focused: boolean;
    color: string;
    size: number;
  }) {
    return (
      <Icon
        source="home"
        size={props.size}
        color={props.focused ? theme.colors.primary : props.color}
      />
    );
  }

  function buildAccountIcon(props: {
    focused: boolean;
    color: string;
    size: number;
  }) {
    return (
      <Icon
        source="account"
        size={props.size}
        color={props.focused ? theme.colors.primary : props.color}
      />
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
      tabBar={buildTabBar}>
      <Tab.Screen
        name="Home"
        component={ProductScreen}
        options={{
          tabBarIcon: buildHomeIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: buildAccountIcon,
        }}
      />
    </Tab.Navigator>
  );
}
