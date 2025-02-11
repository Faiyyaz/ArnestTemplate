import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Switch} from 'react-native-paper';
import appStyles from '../../styles/styles';
import RNPHelperText from '../text/RNPHelperText';

export interface RNPSwitchProps<T extends FieldValues> {
  value: boolean;
  onChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  control?: Control<T>;
  name?: Path<T>; // Ensures name matches a valid field in the form data
  errorText?: string | null;
}

export default function RNPSwitch<T extends FieldValues>(
  props: RNPSwitchProps<T>,
) {
  const {value, onChange, style, control, name, errorText} = props;

  function buildSwitch(v: boolean, toggle: (value: boolean) => void) {
    return <Switch style={style} onValueChange={toggle} value={v} />;
  }

  return (
    <View style={appStyles.flexDirectionColumn}>
      {control && name ? (
        <Controller
          control={control}
          name={name}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          render={({field: {onChange, value}}) => buildSwitch(value, onChange)}
        />
      ) : (
        buildSwitch(value, onChange)
      )}
      <RNPHelperText error={errorText} />
    </View>
  );
}
