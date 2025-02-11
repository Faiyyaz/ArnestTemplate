import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, TextInputProps, useTheme} from 'react-native-paper';
import RNPText from './RNPText';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import RNPHelperText from './RNPHelperText';

interface RNPTextInputProps<T extends FieldValues> extends TextInputProps {
  errorText?: string | null;
  required?: boolean;
  control?: Control<T>;
  name?: Path<T>; // Ensures name matches a valid field in the form data
}

export default function RNPTextInput<T extends FieldValues>(
  props: RNPTextInputProps<T>,
) {
  const {errorText, required = false, control, name, ...otherProps} = props;
  const theme = useTheme();

  function buildTextInput(value?: string, onChange?: (value: string) => void) {
    return (
      <TextInput
        {...otherProps}
        value={value ?? props.value}
        onChangeText={(text: string) => {
          let formattedText = text;

          if (otherProps.keyboardType === 'numeric') {
            formattedText = formattedText.replace(/[^0-9]/g, '');
          }

          if (onChange) {
            onChange(formattedText);
          } else if (otherProps.onChangeText) {
            otherProps.onChangeText(formattedText);
          }
        }}
        error={!!errorText}
        label={
          <RNPText variant="bodyMedium">
            {props.label}
            {required && (
              <RNPText style={{color: theme.colors.error}}> *</RNPText>
            )}
          </RNPText>
        }
      />
    );
  }

  return (
    <View style={styles.textInputContainer}>
      {control && name ? (
        <Controller
          control={control}
          name={name}
          render={({field: {onChange, value}}) =>
            buildTextInput(value, onChange)
          }
        />
      ) : (
        buildTextInput()
      )}
      <RNPHelperText error={errorText} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'column',
  },
});
