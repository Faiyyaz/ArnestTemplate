import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {
  TextInput,
  TextInputProps,
  useTheme,
  List,
  RadioButton,
  Checkbox,
} from 'react-native-paper';
import RNPText from '../text/RNPText';
import appStyles from '../../styles/styles';
import RNPDropdownSheet from './RNPDropdownSheet';
import RNPIcon from '../icon/RNPIcon';

export interface RNPDropdownProps extends TextInputProps {
  disabled?: boolean;
  required?: boolean;
  options: {
    label: string;
    value: string;
  }[];
  searchable?: boolean;
  multiple?: boolean;
  values: string[] | string | undefined;
}

export default function RNPDropdown(props: RNPDropdownProps) {
  const {
    disabled,
    required,
    options,
    values,
    searchable,
    multiple,
    ...otherProps
  } = props;
  const theme = useTheme();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedValues, setSelectedValues] = useState<
    string[] | string | undefined
  >(values ?? undefined); // Update to handle multiple values
  const [tempValues, setTempValues] = useState<string[] | string | undefined>(
    selectedValues,
  ); // Track temporary selection
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    if (!showBottomSheet && searchValue !== '') {
      setSearchValue('');
    }
  }, [showBottomSheet, searchValue]);

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

  function renderEmptyComponent() {
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

  return (
    <View style={[appStyles.flexDirectionColumn]}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        onPress={() => {
          setTempValues(selectedValues); // Store the previous values before opening
          setShowBottomSheet(true);
        }}>
        <TextInput
          {...otherProps}
          value={
            selectedValues
              ? typeof selectedValues === 'string'
                ? options.find(o => o.value === selectedValues)?.label
                : selectedValues
                    .map(value => options.find(o => o.value === value)?.label)
                    .join(', ')
              : undefined
          }
          focusable={false}
          editable={false}
          label={
            <RNPText variant="bodyMedium">
              {props.label}
              {required && (
                <RNPText style={{color: theme.colors.error}}> *</RNPText>
              )}
            </RNPText>
          }
        />
      </TouchableOpacity>
      <RNPDropdownSheet
        searchable={searchable}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        footerButtonLabel="Select"
        onClose={() => {
          setTempValues(selectedValues); // Revert if closed without confirm
          setShowBottomSheet(false);
        }}
        onConfirm={() => {
          setSelectedValues(tempValues); // Save the selected values
          setShowBottomSheet(false);
        }}
        visible={showBottomSheet}>
        <FlatList
          contentContainerStyle={[
            appStyles.flexGrow1,
            appStyles.paddingLeft16,
            appStyles.paddingRight16,
          ]}
          ListEmptyComponent={renderEmptyComponent}
          renderItem={({item}) => (
            <List.Item
              left={() => buildLeftIcon(item.value)}
              onPress={() => {
                if (multiple) {
                  const _values = tempValues ? (tempValues as string[]) : [];
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
      </RNPDropdownSheet>
    </View>
  );
}
