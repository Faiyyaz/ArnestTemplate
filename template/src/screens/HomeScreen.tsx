import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import RNPButton from '../components/button/RNPButton';
import appStyles from '../styles/styles';
import RNPImage from '../components/image/RNPImage';
import {wp} from '../utils/responsive';
import RNPBottomSheet from '../components/bottomsheets/RNPBottomSheet';
import RNPText from '../components/text/RNPText';
import {
  pickSingleAttachment,
  pickSingleImage,
  takeImage,
} from '../utils/attachmentpicker';
import RNPDropdown from '../components/dropdown/RNPDropdown';
import {useNavigation} from '@react-navigation/native';
import RNPAccordion from '../components/common/RNPAccordion';

export default function HomeScreen() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string[] | string | undefined
  >(undefined);
  const navigation: any = useNavigation();

  const accordionData = [
    {id: '1', title: 'Accordion 1', items: ['Item 1', 'Item 2']},
    {id: '2', title: 'Accordion 2', items: ['Item 3', 'Item 4']},
    {id: '3', title: 'Accordion 3', items: ['Item 5', 'Item 6']},
  ];

  return (
    <ScrollView style={appStyles.pageScrollContainer}>
      <RNPAccordion data={accordionData} />
      <RNPButton
        onPress={() => {
          setShowBottomSheet(true);
        }}>
        Show Bottom Sheet
      </RNPButton>
      <RNPButton
        style={appStyles.marginTop20}
        onPress={() => {
          navigation.push('Tabs');
        }}>
        Go to Tab Screen
      </RNPButton>
      <RNPButton
        style={appStyles.marginTop20}
        onPress={async () => {
          const attachment = await pickSingleAttachment();
          console.log('attachment', attachment);
        }}>
        Pick Attachment
      </RNPButton>
      <RNPButton
        style={appStyles.marginTop20}
        onPress={async () => {
          const image = await pickSingleImage();
          console.log('image', image);
        }}>
        Pick Gallery Image
      </RNPButton>
      <RNPButton
        style={appStyles.marginTop20}
        onPress={async () => {
          const camera = await takeImage();
          console.log('camera', camera);
        }}>
        Take Camera Image
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
      <View style={[appStyles.marginTop20, appStyles.marginBottom20]}>
        <RNPDropdown
          searchable={true}
          options={[
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
            {
              label: 'Trans',
              value: 'trans',
            },
            {
              label: 'Gay',
              value: 'gay',
            },
            {
              label: 'Others',
              value: 'others',
            },
          ]}
          multiple={true}
          placeholder="Select Gender"
          values={selectedOption}
          onChange={setSelectedOption}
        />
      </View>
      <RNPBottomSheet
        onClose={() => {
          setShowBottomSheet(false);
        }}
        visible={showBottomSheet}>
        <RNPText>Hello In Bottom Sheet</RNPText>
      </RNPBottomSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: wp(200),
    height: wp(200),
    borderRadius: wp(100),
  },
});
