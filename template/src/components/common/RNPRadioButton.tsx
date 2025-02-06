import React from 'react';
import {RadioButton} from 'react-native-paper';

export interface RNPRadioButtonProps {
  value: string;
  onChange: (value: string) => void;
  selectedValue: string | undefined | null;
}

export default function RNPRadioButton(props: RNPRadioButtonProps) {
  const {value, selectedValue, onChange} = props;

  return (
    <RadioButton
      onPress={() => {
        if (value !== selectedValue) {
          onChange(value);
        }
      }}
      status={value === selectedValue ? 'checked' : 'unchecked'}
      value={value}
    />
  );
}
