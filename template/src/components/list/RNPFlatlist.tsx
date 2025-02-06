import React from 'react';
import {FlatList, FlatListProps, View} from 'react-native';
import appStyles from '../../styles/styles';
import {ActivityIndicator} from 'react-native-paper';
import _ from 'lodash';
import RNPErrorComponent from '../common/RNPErrorComponent';
import RNPFooterComponent from '../common/RNPFooterComponent';

export interface RNPFlatListProps<T> extends FlatListProps<T> {
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  loadMore?: () => void;
  isPaginating?: boolean;
  hasMore?: boolean;
  searchValue?: string;
}

export default function RNPFlatList<T>(props: RNPFlatListProps<T>) {
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
        <FlatList
          {...restProps}
          ListHeaderComponent={<View />}
          ListFooterComponent={<View />}
        />
      </View>
    );
  }

  function buildVerticalList() {
    return (
      <FlatList
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
                  ? restProps.data.length === 0
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
