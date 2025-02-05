import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Icon} from 'react-native-paper';

export interface RNPIconProps {
  source: string;
  color?: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}

export default function RNPIcon(props: RNPIconProps) {
  return <Icon {...props} />;
}
