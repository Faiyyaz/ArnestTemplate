import React from 'react';
import {View} from 'react-native';
import appStyles from '../../styles/styles';
import {ActivityIndicator} from 'react-native-paper';
import _ from 'lodash';
import RNPErrorComponent from '../common/RNPErrorComponent';
import RNPFooterComponent from '../common/RNPFooterComponent';
import {FlashList, FlashListProps} from '@shopify/flash-list';

export interface RNPFlashListProps<T> extends FlashListProps<T> {
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  loadMore?: () => void;
  isPaginating?: boolean;
  hasMore?: boolean;
  searchValue?: string;
}

export default function RNPFlashList<T>(props: RNPFlashListProps<T>) {
  const {
    horizontal,
    ListHeaderComponent,
    ListFooterComponent,
    isLoading,
    error,
    onRetry,
    loadMore,
    isPaginating,
    hasMore,
    searchValue,
    ...restProps
  } = props;

  function buildHorizontalList() {
    return (
      <View style={appStyles.flexDirectionColumn}>
        {/* Render ListHeaderComponent if available */}
        {horizontal && ListHeaderComponent && (
          <View style={props.contentContainerStyle}>
            {typeof ListHeaderComponent === 'function' ? (
              <ListHeaderComponent />
            ) : (
              ListHeaderComponent
            )}
          </View>
        )}
        <FlashList
          {...restProps}
          ListHeaderComponent={<View />}
          ListFooterComponent={<View />}
        />
      </View>
    );
  }

  function buildVerticalList() {
    return (
      <FlashList
        {...restProps}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={
          isPaginating ? (
            <ActivityIndicator animating={isPaginating} />
          ) : (
            <RNPFooterComponent
              searchValue={searchValue}
              isListEmpty={
                isLoading
                  ? false
                  : restProps.data
                  ? restProps.data.length > 0
                  : true
              }
              ListFooterComponent={ListFooterComponent}
            />
          )
        }
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (!horizontal) {
            if (!isLoading && !isPaginating && hasMore && loadMore) {
              loadMore();
            } else if (!isLoading && !isPaginating && loadMore) {
              loadMore();
            }
          }
        }}
      />
    );
  }

  return (
    <View style={appStyles.flexDirectionColumn}>
      {isLoading ? (
        <ActivityIndicator animating={isLoading} />
      ) : restProps.data && _.isEmpty(restProps.data) && error ? (
        <RNPErrorComponent error={error} onRetry={onRetry} />
      ) : horizontal ? (
        buildHorizontalList()
      ) : (
        buildVerticalList()
      )}
    </View>
  );
}
