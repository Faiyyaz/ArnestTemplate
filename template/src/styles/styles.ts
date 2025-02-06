import {StyleSheet} from 'react-native';
import {hp, wp} from '../utils/responsive';

const appStyles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
  },

  flexDirectionColumn: {
    flexDirection: 'column',
  },

  flexWrapWrap: {
    flexWrap: 'wrap',
  },

  alignItemsCenter: {
    alignItems: 'center',
  },

  alignSelfCenter: {
    alignSelf: 'center',
  },

  justifyContentCenter: {
    justifyContent: 'center',
  },

  justifyContentFlexEnd: {
    justifyContent: 'flex-end',
  },

  textAlignCenter: {
    textAlign: 'center',
  },

  flex1: {
    flex: 1,
  },

  flexGrow1: {
    flexGrow: 1,
  },

  pageContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  pageScrollContainer: {
    flexGrow: 1,
    flexDirection: 'column',
  },

  marginRight8: {
    marginRight: wp(8),
  },

  marginRight12: {
    marginRight: wp(12),
  },

  marginBottom16: {
    marginBottom: hp(16),
  },

  marginBottom20: {
    marginBottom: hp(20),
  },

  marginTop20: {
    marginTop: hp(20),
  },

  marginTop8: {
    marginTop: hp(8),
  },

  marginBottom8: {
    marginBottom: hp(8),
  },

  padding0: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  paddingLeft16: {
    paddingLeft: wp(16),
  },

  paddingRight16: {
    paddingRight: wp(16),
  },

  paddingTop16: {
    paddingTop: hp(16),
  },

  paddingBottom16: {
    paddingBottom: hp(16),
  },

  paddingVertical8: {
    paddingTop: hp(8),
    paddingBottom: hp(8),
  },

  paddingTop18: {
    paddingTop: hp(18),
  },

  paddingBottom18: {
    paddingBottom: hp(18),
  },

  paddingLeft24: {
    paddingLeft: wp(24),
  },

  paddingRight24: {
    paddingRight: wp(24),
  },

  borderRadius10: {
    borderRadius: wp(10),
  },
});

export default appStyles;
