import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Checkbox} from 'react-native-paper';

export interface RNPCheckboxProps {
  value: boolean;
  onChange: (values: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export default function RNPCheckbox(props: RNPCheckboxProps) {
  const {value, onChange, style} = props;

  return (
    <View style={style}>
      <Checkbox
        onPress={() => {
          onChange(!value);
        }}
        status={value ? 'checked' : 'unchecked'}
      />
    </View>
  );
}
