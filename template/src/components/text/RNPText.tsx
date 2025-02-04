import React from 'react';
import {TextStyle} from 'react-native';
import {Text, TextProps} from 'react-native-paper';

export default function RNPText(props: TextProps<TextStyle>) {
  return <Text {...props} />;
}
