import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {StyleProp, View, ViewStyle} from 'react-native';
import {RadioButton} from 'react-native-paper';
import RNPHelperText from '../text/RNPHelperText';

export interface RNPRadioButtonProps<T extends FieldValues> {
  value: string;
  onChange: (value: string) => void;
  selectedValue: string | undefined | null;
  style?: StyleProp<ViewStyle>;
  control?: Control<T>;
  name?: Path<T>; // Ensures name matches a valid field in the form data
  errorText?: string | null;
}

export default function RNPRadioButton<T extends FieldValues>(
  props: RNPRadioButtonProps<T>,
) {
  const {value, selectedValue, onChange, style, control, name, errorText} =
    props;

  function buildRadioButton(v: string, toggle: (value: string) => void) {
    return (
      <RadioButton
        onPress={() => {
          if (v !== selectedValue) {
            toggle(v);
          }
        }}
        status={v === selectedValue ? 'checked' : 'unchecked'}
        value={v}
      />
    );
  }

  return (
    <View style={style}>
      {control && name ? (
        <Controller
          control={control}
          name={name}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          render={({field: {onChange, value}}) =>
            buildRadioButton(value, onChange)
          }
        />
      ) : (
        buildRadioButton(value, onChange)
      )}
      <RNPHelperText error={errorText} />
    </View>
  );
}
