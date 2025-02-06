import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HelperText,
  TextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper';
import RNPText from './RNPText';

interface HtsTextInputProps extends TextInputProps {
  errorText?: string | undefined | null;
  required?: boolean;
  fieldType?: string;
}

export default function HtsTextInput(props: HtsTextInputProps) {
  const {errorText, required = false, ...otherProps} = props;
  const theme = useTheme();

  function buildTextInput(
    value?: string,
    onChange?: (...event: any[]) => void,
  ) {
    return (
      <TextInput
        {...otherProps}
        value={value ? value : props.value}
        onChangeText={(e: string) => {
          let v = e;

          if (otherProps.keyboardType === 'numeric') {
            v = v.replace(/[^0-9]/g, '');
          }

          if (onChange) {
            onChange(value);
          } else if (otherProps.onChangeText) {
            otherProps.onChangeText(v);
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
      {buildTextInput()}
      {errorText && (
        <HelperText type="error" visible={!!errorText}>
          {errorText || ''}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'column',
  },
});
