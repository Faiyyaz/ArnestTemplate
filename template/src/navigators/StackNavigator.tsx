import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import RNPAppBar from '../components/appbar/RNPAppBar';
import TabNavigator from './TabNavigator';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();
const MyAppBar = (props: any) => <RNPAppBar {...props} />;

export default function StackNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: MyAppBar,
        contentStyle: {backgroundColor: theme.colors.background},
      }}>
      <Stack.Screen name="Home" component={BottomNavigator} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
