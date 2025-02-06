import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Switch} from 'react-native-paper';

export interface RNPSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export default function RNPSwitch(props: RNPSwitchProps) {
  const {value, onChange, style} = props;

  return <Switch style={style} onValueChange={onChange} value={value} />;
}
