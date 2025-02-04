import React, {useEffect, useRef} from 'react';
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useTheme} from 'react-native-paper';

export interface RNPBottomSheetProps extends BottomSheetProps {
  visible: boolean;
}

export default function RNPBottomSheet(props: RNPBottomSheetProps) {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (!props.visible) {
      bottomSheetRef.current?.close(); // Closes the BottomSheet properly
    }
  }, [props.visible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      {...props}
      snapPoints={props.snapPoints ? props.snapPoints : ['90%']}
      index={props.visible ? 0 : -1}
      style={{backgroundColor: theme.colors.background}}
      enableDynamicSizing={false}
      enablePanDownToClose={false}
      handleIndicatorStyle={{backgroundColor: theme.colors.onBackground}}
      handleStyle={{backgroundColor: theme.colors.background}}>
      <BottomSheetView>{props.children}</BottomSheetView>
    </BottomSheet>
  );
}
