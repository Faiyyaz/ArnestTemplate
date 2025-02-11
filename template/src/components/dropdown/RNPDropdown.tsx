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
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import RNPHelperText from '../text/RNPHelperText';

export interface RNPDropdownProps<T extends FieldValues> {
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
  control?: Control<T>;
  name?: Path<T>; // Ensures name matches a valid field in the form data
  errorText?: string | null;
}

export default function RNPDropdown<T extends FieldValues>(
  props: RNPDropdownProps<T>,
) {
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
    control,
    name,
    errorText,
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

  /// TODO : Handle form with dropdown
  function buildDropdown(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    v: string[] | string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggle: (values: string[] | string | undefined) => void,
  ) {
    return (
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
    );
  }

  return (
    <View style={appStyles.flexDirectionColumn}>
      {control && name ? (
        <Controller
          control={control}
          name={name}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          render={({field: {onChange, value}}) =>
            buildDropdown(value, onChange)
          }
        />
      ) : (
        buildDropdown(values, onChange)
      )}

      <RNPHelperText error={errorText} />

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
