import {StyleSheet} from 'react-native';
import {hp} from '../utils/responsive';

const appStyles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
  },

  flexDirectionColumn: {
    flexDirection: 'column',
  },

  alignItemsCenter: {
    alignItems: 'center',
  },

  justifyContentCenter: {
    justifyContent: 'center',
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

  marginBottom20: {
    marginBottom: hp(20),
  },

  marginTop20: {
    marginTop: hp(20),
  },

  padding0: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
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
});

export default appStyles;
