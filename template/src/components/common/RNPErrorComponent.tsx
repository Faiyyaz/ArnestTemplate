import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import appStyles from '../../styles/styles';
import RNPIcon from '../icon/RNPIcon';
import RNPText from '../text/RNPText';
import RNPButton from '../button/RNPButton';

export interface RNPErrorComponentProps {
  error: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function RNPErrorComponent(props: RNPErrorComponentProps) {
  const {error, onRetry, style} = props;

  return (
    <View
      style={[
        appStyles.pageContainer,
        appStyles.paddingTop16,
        appStyles.paddingBottom16,
        appStyles.alignItemsCenter,
        style ? style : {},
      ]}>
      <RNPIcon
        style={appStyles.marginBottom16}
        size={84}
        source="alert-octagon-outline"
      />
      <RNPText variant="titleMedium" style={appStyles.textAlignCenter}>
        {error}
      </RNPText>
      {onRetry && <RNPButton onPress={onRetry}>Retry</RNPButton>}
    </View>
  );
}
