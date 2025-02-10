import React from 'react';
import {View, ViewProps} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import RNPErrorComponent from './RNPErrorComponent';

export interface RNPCustomViewProps extends ViewProps {
  // Add any custom props you want to support
  isLoading: boolean;
  error?: string | null;
  onRetry: () => void;
}

export default function RNPCustomView(props: RNPCustomViewProps) {
  const {isLoading, error, onRetry, children, ...restProps} = props;

  return (
    <View {...restProps}>
      {isLoading ? (
        <ActivityIndicator animating={true} />
      ) : error ? (
        <RNPErrorComponent error={error} onRetry={onRetry} />
      ) : (
        children
      )}
    </View>
  );
}
