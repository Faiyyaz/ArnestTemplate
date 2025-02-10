import analytics from '@react-native-firebase/analytics';

export async function setUserId(userId: string): Promise<void> {
  await analytics().setUserId(userId);
}

export async function setUserProperties(properties: {
  [key: string]: string | null;
}): Promise<void> {
  const formattedProperties: {[key: string]: string | null} = {};

  Object.entries(properties).forEach(([key, value]) => {
    formattedProperties[key] =
      value && value.length > 35 ? value.substring(0, 35) : value;
  });

  await analytics().setUserProperties(formattedProperties);
}

export async function logEvent(
  name: string,
  properties: {
    [key: string]: string | null;
  },
): Promise<void> {
  const formattedProperties: {[key: string]: string | null} = {};

  Object.entries(properties).forEach(([key, value]) => {
    formattedProperties[key] =
      value && value.length > 99 ? value.substring(0, 99) : value;
  });

  await analytics().logEvent(name, properties);
}
