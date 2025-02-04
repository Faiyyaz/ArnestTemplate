import React from 'react';
import {View} from 'react-native';
import RNPButton from '../components/button/RNPButton';

export default function HomeScreen() {
  return (
    <View>
      <RNPButton
        onPress={() => {
          console.log('Button Pressed');
        }}>
        Press Me
      </RNPButton>
    </View>
  );
}
