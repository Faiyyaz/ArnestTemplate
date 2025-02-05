import React, {useState} from 'react';
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

export interface RNPDropdownProps extends TextInputProps {
  disabled?: boolean;
  required?: boolean;
  options: {
    label: string;
    value: string;
  }[];
}

export default function RNPDropdown(props: RNPDropdownProps) {
  const {disabled, required, options, value, ...otherProps} = props;
  const theme = useTheme();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);
  const [tempValue, setTempValue] = useState<string | undefined>(value);

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
          data={options}
          extraData={tempValue}
        />
      </RNPDropdownSheet>
    </View>
  );
}
