import Toast from 'react-native-toast-message';
import {RNPToastProps} from '../components/common/RNPToast';

export function showToast(props: RNPToastProps) {
  Toast.show({
    type: props.type,
    text1: props.title,
    text2: props.description,
  });
}
