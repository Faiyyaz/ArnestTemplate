import React from 'react';
import RNPEmptyComponent from './RNPEmptyComponent';

export interface RNPFooterComponentProps {
  searchValue: string | undefined;
  isListEmpty: boolean;
  ListFooterComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

export default function RNPFooterComponent(props: RNPFooterComponentProps) {
  const {searchValue, isListEmpty, ListFooterComponent} = props;

  return isListEmpty ? (
    <RNPEmptyComponent searchValue={searchValue} />
  ) : typeof ListFooterComponent === 'function' ? (
    <ListFooterComponent />
  ) : (
    ListFooterComponent
  );
}
