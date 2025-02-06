import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {RadioButton} from 'react-native-paper';

export interface RNPRadioButtonProps {
  value: string;
  onChange: (value: string) => void;
  selectedValue: string | undefined | null;
  style?: StyleProp<ViewStyle>;
}

export default function RNPRadioButton(props: RNPRadioButtonProps) {
  const {value, selectedValue, onChange, style} = props;

  return (
    <View style={style}>
      <RadioButton
        onPress={() => {
          if (value !== selectedValue) {
            onChange(value);
          }
        }}
        status={value === selectedValue ? 'checked' : 'unchecked'}
        value={value}
      />
    </View>
  );
}
