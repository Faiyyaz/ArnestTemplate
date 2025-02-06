import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, Dimensions, Easing} from 'react-native';
import {
  Checkbox,
  List,
  Modal,
  ModalProps,
  Portal,
  RadioButton,
  useTheme,
} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import appStyles from '../../styles/styles';
import {hp, wp} from '../../utils/responsive';
import RNPText from '../text/RNPText';
import RNPIconButton from '../button/RNPIconButton';
import RNPButton from '../button/RNPButton';
import RNPSearchBar from '../text/RNPSearchbar';
import RNPFlatList from '../list/RNPFlatlist';

export interface RNPDropdownSheetProps extends Omit<ModalProps, 'children'> {
  headerTitle?: string;
  footerButtonLabel?: string;
  disableFooterButton?: boolean;
  onClose: () => void;
  onConfirm: (values: string[] | string | undefined) => void;
  searchable?: boolean;
  options: {
    label: string;
    value: string;
  }[];
  multiple?: boolean;
  values: string[] | string | undefined;
  searchPlaceholder?: string;
}

export default function RNPDropdownSheet(props: RNPDropdownSheetProps) {
  const {
    headerTitle = '',
    onClose,
    footerButtonLabel,
    disableFooterButton,
    onConfirm,
    searchable,
    options,
    multiple,
    values,
    searchPlaceholder,
    ...otherProps
  } = props;
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const screenHeight = Dimensions.get('window').height;

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  const [shouldClose, setShouldClose] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [tempValues, setTempValues] = useState<string[] | string | undefined>(
    values,
  );

  useEffect(() => {
    if (!otherProps.visible && searchValue !== '') {
      setSearchValue('');
    }
  }, [otherProps.visible, searchValue]);

  useEffect(() => {
    if (searchValue !== '') {
      let _filteredOptions = [...options];

      _filteredOptions = _filteredOptions.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      );

      setFilteredOptions(_filteredOptions);
    } else {
      setFilteredOptions(options);
    }
  }, [searchValue, options]);

  function buildLeftIcon(itemValue: string) {
    const isSelected = tempValues?.includes(itemValue);
    return multiple ? (
      <Checkbox
        onPress={() => {
          const _values = tempValues ? (tempValues as string[]) : [];
          if (isSelected) {
            setTempValues(_values?.filter(value => value !== itemValue));
          } else {
            setTempValues([..._values, itemValue]);
          }
        }}
        status={isSelected ? 'checked' : 'unchecked'}
      />
    ) : (
      <RadioButton
        onPress={() => {
          setTempValues(itemValue);
        }}
        value={isSelected ? 'checked' : 'unchecked'}
        status={isSelected ? 'checked' : 'unchecked'}
      />
    );
  }

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
              backgroundColor: theme.colors.background,
              paddingBottom: insets.bottom + hp(40),
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View style={[appStyles.flexDirectionColumn]}>
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
            {searchable && (
              <RNPSearchBar
                placeholder={searchPlaceholder}
                style={[appStyles.marginTop8, appStyles.marginBottom8]}
                value={searchValue}
                onChangeText={setSearchValue}
              />
            )}
            <RNPFlatList
              contentContainerStyle={[
                appStyles.flexGrow1,
                appStyles.paddingLeft16,
                appStyles.paddingRight16,
              ]}
              renderItem={({item}) => (
                <List.Item
                  left={() => buildLeftIcon(item.value)}
                  onPress={() => {
                    if (multiple) {
                      const _values = tempValues
                        ? (tempValues as string[])
                        : [];
                      const newTempValues = _values.includes(item.value)
                        ? _values.filter(value => value !== item.value)
                        : [..._values, item.value];
                      setTempValues(newTempValues); // Update temp values for multiple selection
                    } else {
                      setTempValues(item.value); // Single selection
                    }
                  }}
                  style={[appStyles.padding0, appStyles.paddingVertical8]}
                  titleStyle={{
                    ...theme.fonts.bodyLarge,
                    color: tempValues?.includes(item.value)
                      ? theme.colors.primary
                      : theme.colors.onSurface,
                  }}
                  title={item.label}
                />
              )}
              keyExtractor={item => item.value}
              data={filteredOptions}
              extraData={tempValues}
            />
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
                    onConfirm(tempValues); // Call confirm handler
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
    ...appStyles.flexDirectionColumn,
    ...appStyles.justifyContentFlexEnd,
  },
  bottomSheet: {
    ...appStyles.flexDirectionColumn,
    borderTopLeftRadius: wp(12),
    borderTopRightRadius: wp(12),
    maxHeight: '93%',
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
