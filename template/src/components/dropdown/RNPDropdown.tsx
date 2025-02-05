import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {
  TextInput,
  TextInputProps,
  useTheme,
  List,
  RadioButton,
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
}

export default function RNPDropdown(props: RNPDropdownProps) {
  const {disabled, required, options, value, searchable, ...otherProps} = props;
  const theme = useTheme();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);
  const [tempValue, setTempValue] = useState<string | undefined>(value);
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
    return (
      <RadioButton
        color={theme.colors.primary}
        onPress={() => {
          setTempValue(itemValue);
        }}
        value={itemValue === tempValue ? 'checked' : 'unchecked'}
        status={itemValue === tempValue ? 'checked' : 'unchecked'}
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
          setTempValue(selectedValue); // Store the previous value before opening
          setShowBottomSheet(true);
        }}>
        <TextInput
          {...otherProps}
          value={
            selectedValue
              ? options.find(o => o.value === selectedValue)?.label
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
          setTempValue(selectedValue); // Revert if closed without confirm
          setShowBottomSheet(false);
        }}
        onConfirm={() => {
          setSelectedValue(tempValue); // Save the selected value
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
                setTempValue(item.value);
              }}
              style={[appStyles.padding0, appStyles.paddingVertical8]}
              titleStyle={{
                ...theme.fonts.bodyLarge,
                color:
                  tempValue === item.value
                    ? theme.colors.primary
                    : theme.colors.onSurface,
              }}
              title={item.label}
            />
          )}
          keyExtractor={item => item.value}
          data={filteredOptions}
          extraData={tempValue}
        />
      </RNPDropdownSheet>
    </View>
  );
}
