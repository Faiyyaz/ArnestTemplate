import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNPButton from '../components/button/RNPButton';
import appStyles from '../styles/styles';
import RNPImage from '../components/image/RNPImage';
import {wp} from '../utils/responsive';
import RNPBottomSheet from '../components/bottomsheets/RNPBottomSheet';
import RNPText from '../components/text/RNPText';

export default function HomeScreen() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  return (
    <View style={appStyles.pageContainer}>
      <RNPButton
        onPress={() => {
          setShowBottomSheet(true);
        }}>
        Show Bottom Sheet
      </RNPButton>
      <View style={[appStyles.marginTop20, appStyles.marginBottom20]}>
        <RNPImage
          source={{
            uri: 'https://images.unsplash.com/photo-1684262483735-1101bcb10f0d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.imageStyle}
        />
      </View>
      <RNPImage
        source={{
          uri: 'https://images.unsplash.com/photo-1684262483735-1101bcb10f0f?q=80&w=1949',
        }}
        style={styles.imageStyle}
      />
      <RNPBottomSheet visible={showBottomSheet}>
        <RNPText>Hello In Bottom Sheet</RNPText>
        <RNPButton
          onPress={() => {
            setShowBottomSheet(false);
          }}>
          Close
        </RNPButton>
      </RNPBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: wp(200),
    height: wp(200),
    borderRadius: wp(100),
  },
});
