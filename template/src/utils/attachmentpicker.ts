import {
  DocumentPickerOptions,
  DocumentPickerResponse,
  pick,
} from '@react-native-documents/picker';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export async function pickSingleAttachment(
  options?: DocumentPickerOptions,
): Promise<DocumentPickerResponse | null> {
  try {
    const results: DocumentPickerResponse[] | null = await pick({
      ...options,
      allowMultiSelection: false,
    });

    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pickMultipleAttachment(
  options?: DocumentPickerOptions,
): Promise<DocumentPickerResponse[]> {
  try {
    const results: DocumentPickerResponse[] | null = await pick({
      ...options,
      allowMultiSelection: false,
    });

    if (results.length > 0) {
      return results;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function pickSingleImage(
  options?: ImageLibraryOptions,
): Promise<Asset | null> {
  try {
    if (!options) {
      options = {
        mediaType: 'photo',
      };
    }

    const results: ImagePickerResponse = await launchImageLibrary({
      ...options,
      includeBase64: true,
      selectionLimit: 1,
    });

    if (results.assets && results.assets.length > 0) {
      return results.assets[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pickMultipleImage(
  options?: ImageLibraryOptions,
): Promise<Asset[] | null> {
  try {
    if (!options) {
      options = {
        mediaType: 'photo',
      };
    }
    const results = await launchImageLibrary({
      ...options,
      includeBase64: true,
    });
    if (results.assets && results.assets.length > 0) {
      return results.assets;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function takeImage(
  options?: ImageLibraryOptions,
): Promise<Asset | null> {
  try {
    if (!options) {
      options = {
        mediaType: 'photo',
      };
    }
    const results = await launchCamera({
      ...options,
      includeBase64: true,
    });

    if (results.assets && results.assets.length > 0) {
      return results.assets[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
