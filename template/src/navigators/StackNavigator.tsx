import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import RNPAppBar from '../components/appbar/RNPAppBar';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import WebViewScreen from '../screens/WebViewScreen';

const Stack = createNativeStackNavigator();
const MyAppBar = (props: any) => <RNPAppBar {...props} />;

export default function StackNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        header: MyAppBar,
        contentStyle: {backgroundColor: theme.colors.background},
      }}>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
