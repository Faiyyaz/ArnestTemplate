import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import RNPText from '../text/RNPText';
import appStyles from '../../styles/styles';
import RNPDropdownSheet from './RNPDropdownSheet';
import _ from 'lodash';
import {Chip} from 'react-native-paper';

export interface RNPDropdownProps {
  disabled?: boolean;
  required?: boolean;
  options: {
    label: string;
    value: string;
  }[];
  searchable?: boolean;
  multiple?: boolean;
  values: string[] | string | undefined;
  placeholder?: string;
  buttonLabel?: string;
  searchPlaceholder?: string;
  onChange: (values: string[] | string | undefined) => void;
  style?: StyleProp<ViewStyle>;
}

export default function RNPDropdown(props: RNPDropdownProps) {
  const {
    disabled,
    options,
    values,
    searchable,
    multiple = false,
    placeholder = 'Select an option',
    buttonLabel = 'Select',
    searchPlaceholder = 'Search',
    style,
    onChange,
  } = props;

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const selectedValues = multiple && Array.isArray(values) ? values : [];

  function handleRemove(index: number) {
    if (!multiple || !Array.isArray(values)) {
      return;
    }

    const updatedValues = [...values];
    updatedValues.splice(index, 1); // Remove the selected value

    onChange(updatedValues.length > 0 ? updatedValues : undefined); // Ensure empty selection is handled properly
  }

  return (
    <View style={appStyles.flexDirectionColumn}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        style={style}
        onPress={() => setShowBottomSheet(true)}>
        {multiple ? (
          !_.isEmpty(selectedValues) ? (
            <View style={styles.chipContainer}>
              {selectedValues.map((value, index) => (
                <Chip
                  style={styles.chipMargin}
                  key={index}
                  onClose={() => handleRemove(index)}>
                  {options.find(option => option.value === value)?.label}
                </Chip>
              ))}
            </View>
          ) : (
            <RNPText>{placeholder}</RNPText>
          )
        ) : (
          <RNPText>
            {values
              ? options.find(option => option.value === values)?.label
              : placeholder}
          </RNPText>
        )}
      </TouchableOpacity>

      <RNPDropdownSheet
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        multiple={multiple}
        values={selectedValues}
        options={options}
        footerButtonLabel={buttonLabel}
        onClose={() => setShowBottomSheet(false)}
        onConfirm={newValues => {
          onChange(newValues);
          setShowBottomSheet(false);
        }}
        visible={showBottomSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    ...appStyles.flexDirectionRow,
    ...appStyles.flexWrapWrap,
  },
  chipMargin: {
    ...appStyles.marginRight8,
    ...appStyles.marginBottom8,
  },
});
