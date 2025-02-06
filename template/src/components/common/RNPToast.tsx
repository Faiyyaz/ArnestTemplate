import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {BaseToastProps, ToastType} from 'react-native-toast-message';
import appStyles from '../../styles/styles';
import RNPText from '../text/RNPText';
import {wp} from '../../utils/responsive';

export interface RNPToastProps {
  type: ToastType;
  title: string;
  description?: string;
}

interface CustomToastProps extends BaseToastProps {
  text1: string;
  text2?: string;
}

const toastConfig = {
  error: ({text1, text2}: CustomToastProps) => (
    <View style={[styles.container, styles.errorColor]}>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={require('../../assets/icons/failure.png')}
      />
      <View style={styles.contentContainer}>
        <RNPText style={styles.textColor} variant="titleMedium">
          {text1}
        </RNPText>
        {text2 && (
          <RNPText style={styles.textColor} variant="bodyMedium">
            {text2}
          </RNPText>
        )}
      </View>
    </View>
  ),
  success: ({text1, text2}: CustomToastProps) => (
    <View style={[styles.container, styles.successColor]}>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={require('../../assets/icons/success.png')}
      />
      <View style={styles.contentContainer}>
        <RNPText style={styles.textColor} variant="titleMedium">
          {text1}
        </RNPText>
        {text2 && (
          <RNPText style={styles.textColor} variant="bodyMedium">
            {text2}
          </RNPText>
        )}
      </View>
    </View>
  ),
  info: ({text1, text2}: CustomToastProps) => (
    <View style={[styles.container, styles.infoColor]}>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={require('../../assets/icons/info.png')}
      />
      <View style={styles.contentContainer}>
        <RNPText style={styles.textColor} variant="titleMedium">
          {text1}
        </RNPText>
        {text2 && (
          <RNPText style={styles.textColor} variant="bodyMedium">
            {text2}
          </RNPText>
        )}
      </View>
    </View>
  ),
  default: ({text1, text2}: CustomToastProps) => (
    <View style={[styles.container, styles.defaultColor]}>
      <View style={styles.contentContainer}>
        <RNPText style={styles.textColor} variant="titleMedium">
          {text1}
        </RNPText>
        {text2 && (
          <RNPText style={styles.textColor} variant="bodyMedium">
            {text2}
          </RNPText>
        )}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: wp(343),
    padding: 0,
    margin: 0,
    ...appStyles.borderRadius10,
    ...appStyles.paddingTop16,
    ...appStyles.paddingBottom16,
    ...appStyles.paddingRight24,
    ...appStyles.flexDirectionRow,
    ...appStyles.alignItemsCenter,
    ...appStyles.paddingLeft24,
  },
  successColor: {
    backgroundColor: '#4CAF50',
  },
  infoColor: {
    backgroundColor: '#2196F3',
  },
  errorColor: {
    backgroundColor: '#F44336',
  },
  defaultColor: {
    backgroundColor: '#000000',
  },
  icon: {
    ...appStyles.marginRight12,
    width: wp(24),
    height: wp(24),
  },
  contentContainer: {
    ...appStyles.flexDirectionColumn,
    ...appStyles.flex1,
  },
  textColor: {
    color: 'white',
  },
});

export default toastConfig;
