import {StyleSheet} from 'react-native';
import {hp} from '../utils/responsive';

const appStyles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
  },

  flexDirectionColumn: {
    flexDirection: 'column',
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

  marginBottom20: {
    marginBottom: hp(20),
  },

  marginTop20: {
    marginTop: hp(20),
  },
});

export default appStyles;
