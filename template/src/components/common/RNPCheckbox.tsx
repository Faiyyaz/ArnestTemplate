import React from 'react';
import {Checkbox} from 'react-native-paper';

export interface RNPCheckboxProps {
  value: boolean;
  onChange: (values: boolean) => void;
}

export default function RNPCheckbox(props: RNPCheckboxProps) {
  const {value, onChange} = props;

  return (
    <Checkbox
      onPress={() => {
        onChange(!value);
      }}
      status={value ? 'checked' : 'unchecked'}
    />
  );
}
