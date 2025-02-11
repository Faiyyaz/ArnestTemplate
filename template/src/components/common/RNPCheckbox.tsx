import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Checkbox} from 'react-native-paper';
import RNPHelperText from '../text/RNPHelperText';

export interface RNPCheckboxProps<T extends FieldValues> {
  value: boolean;
  onChange: (values: boolean) => void;
  style?: StyleProp<ViewStyle>;
  control?: Control<T>;
  name?: Path<T>; // Ensures name matches a valid field in the form data
  errorText?: string | null;
}

export default function RNPCheckbox<T extends FieldValues>(
  props: RNPCheckboxProps<T>,
) {
  const {value, onChange, control, name, style, errorText} = props;

  function buildCheckbox(v: boolean, toggle: (value: boolean) => void) {
    return (
      <Checkbox
        onPress={() => {
          toggle(!v);
        }}
        status={v ? 'checked' : 'unchecked'}
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
            buildCheckbox(value, onChange)
          }
        />
      ) : (
        buildCheckbox(value, onChange)
      )}
      <RNPHelperText error={errorText} />
    </View>
  );
}
