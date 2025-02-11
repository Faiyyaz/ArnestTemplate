import React from 'react';
import {HelperText} from 'react-native-paper';

export interface RNPHelperTextProps {
  error: string | null | undefined;
}

export default function RNPHelperText(props: RNPHelperTextProps) {
  const {error} = props;

  return (
    <HelperText type="error" visible={!!error}>
      {error}
    </HelperText>
  );
}
