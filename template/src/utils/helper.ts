import Toast from 'react-native-toast-message';
import {RNPToastProps} from '../components/common/RNPToast';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export function showToast(props: RNPToastProps) {
  Toast.show({
    type: props.type,
    text1: props.title,
    text2: props.description,
  });
}

export async function openInAppBrowser(url: string): Promise<void> {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url);
    } else {
      console.log('Browser is not available');
    }
  } catch (error) {
    console.log('error', error);
  }
}
