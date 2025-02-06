import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper';

export interface RNPCardProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  mode: 'elevated' | 'outlined' | 'contained';
}

export default function RNPCard(props: RNPCardProps) {
  return <Card {...props}>{props.children}</Card>;
}
