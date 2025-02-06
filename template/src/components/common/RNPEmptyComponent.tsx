import React from 'react';
import {View} from 'react-native';
import appStyles from '../../styles/styles';
import RNPIcon from '../icon/RNPIcon';
import RNPText from '../text/RNPText';

export interface RNPEmptyComponentProps {
  searchValue?: string;
}

export default function RNPEmptyComponent(props: RNPEmptyComponentProps) {
  const {searchValue} = props;

  return (
    <View
      style={[
        appStyles.flexDirectionColumn,
        appStyles.paddingTop16,
        appStyles.paddingBottom16,
        appStyles.alignItemsCenter,
      ]}>
      <RNPIcon
        style={appStyles.marginBottom16}
        size={84}
        source="alert-octagon-outline"
      />
      {searchValue ? (
        <RNPText variant="titleMedium" style={appStyles.textAlignCenter}>
          No results found for ‘{searchValue}’. Try a different search term.
        </RNPText>
      ) : (
        <RNPText variant="titleMedium" style={appStyles.textAlignCenter}>
          Looks a little empty here. Check back later!
        </RNPText>
      )}
    </View>
  );
}
