import React from 'react';
import {Dialog, DialogProps, Portal} from 'react-native-paper';

export default function RNPDialog(props: DialogProps) {
  return (
    <Portal>
      <Dialog {...props} />;
    </Portal>
  );
}
