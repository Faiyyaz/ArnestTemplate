import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, Dimensions, Easing} from 'react-native';
import {Modal, ModalProps, Portal, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import appStyles from '../../styles/styles';
import {hp, wp} from '../../utils/responsive';
import RNPText from '../text/RNPText';
import RNPIconButton from '../button/RNPIconButton';
import RNPButton from '../button/RNPButton';

export interface RNPDropdownSheetProps extends ModalProps {
  headerTitle?: string;
  footerButtonLabel?: string;
  disableFooterButton?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function RNPDropdownSheet(props: RNPDropdownSheetProps) {
  const {
    headerTitle = '',
    onClose,
    footerButtonLabel,
    disableFooterButton,
    onConfirm,
    ...otherProps
  } = props;
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const screenHeight = Dimensions.get('window').height;

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  const [shouldClose, setShouldClose] = useState(false);

  useEffect(() => {
    if (!shouldClose && otherProps.visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    } else if (shouldClose) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        easing: Easing.in(Easing.exp),
        useNativeDriver: true,
      }).start(() => {
        setShouldClose(false);
        onClose(); // Call onClose when animation completes
      });
    }
  }, [otherProps.visible, shouldClose, onClose, screenHeight, slideAnim]);

  return (
    <Portal>
      <Modal
        {...otherProps}
        dismissableBackButton={false}
        dismissable={false}
        contentContainerStyle={styles.container}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View
            style={[
              appStyles.flexDirectionColumn,
              {
                backgroundColor: theme.colors.background,
                paddingBottom: insets.bottom + hp(40),
              },
            ]}>
            <View
              style={[
                styles.header,
                {borderBottomColor: theme.colors.outline},
              ]}>
              <RNPText
                style={[
                  appStyles.flex1,
                  appStyles.textAlignCenter,
                  appStyles.flex1,
                ]}
                variant="titleLarge">
                {headerTitle}
              </RNPText>
              <RNPIconButton
                onPress={() => {
                  setShouldClose(true);
                }}
                size={wp(24)}
                icon="close"
              />
            </View>
            {props.children}
            {footerButtonLabel && (
              <View
                style={[
                  styles.footer,
                  {
                    borderTopColor: theme.colors.outline,
                    backgroundColor: theme.colors.background,
                  },
                ]}>
                <RNPButton
                  disabled={disableFooterButton}
                  onPress={() => {
                    onConfirm?.(); // Call confirm handler
                    setShouldClose(true);
                  }}
                  mode="contained">
                  {footerButtonLabel}
                </RNPButton>
              </View>
            )}
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex1,
    ...appStyles.alignItemsCenter,
    ...appStyles.justifyContentCenter,
    ...appStyles.flexDirectionColumn,
  },
  bottomSheet: {
    ...appStyles.flexDirectionColumn,
    ...appStyles.flex1,
    ...appStyles.justifyContentFlexEnd,
    borderTopLeftRadius: wp(12),
    borderTopRightRadius: wp(12),
    marginTop: hp(81),
    width: '100%',
  },
  header: {
    ...appStyles.flexDirectionRow,
    ...appStyles.alignItemsCenter,
    ...appStyles.paddingTop18,
    ...appStyles.paddingBottom18,
    borderBottomWidth: 1,
  },
  footer: {
    ...appStyles.flexDirectionRow,
    ...appStyles.alignItemsCenter,
    ...appStyles.justifyContentCenter,
    ...appStyles.paddingTop18,
    borderTopWidth: 1,
  },
});
