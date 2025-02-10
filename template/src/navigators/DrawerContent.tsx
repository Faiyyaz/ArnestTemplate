import React from 'react';
import {View} from 'react-native';
import appStyles from '../styles/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hp} from '../utils/responsive';

export default function DrawerContent() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        appStyles.flexDirectionColumn,
        appStyles.paddingLeft16,
        appStyles.paddingRight16,
        {paddingTop: insets.top > 50 ? insets.top : hp(50)},
      ]}
    />
  );
}
