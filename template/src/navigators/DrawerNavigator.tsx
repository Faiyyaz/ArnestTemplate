import React from 'react';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import RNPAppBar from '../components/appbar/RNPAppBar';
import {wp} from '../utils/responsive';
import BottomNavigator from './BottomNavigator';
const Drawer = createDrawerNavigator();

// Define your DrawerContent outside of the DetailScreen component
const MyDrawerContent = (props: any) => <DrawerContent {...props} />;
const MyAppBar = (props: any) => <RNPAppBar {...props} />;

export default function DrawerNavigator() {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={({}) => ({
        header: MyAppBar,
        contentStyle: {backgroundColor: theme.colors.background},
        drawerType: 'front',
        drawerStyle: {width: wp(310)},
        headerBackTitle: '', // Hides the back title
      })}
      drawerContent={MyDrawerContent}>
      <Drawer.Screen name="Home" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}
