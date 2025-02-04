import React, {useLayoutEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {navigationRef} from '../../navigators/RootNavigator';

export default function RNPAppBar(props: NativeStackHeaderProps) {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  // Dynamically set the title using useLayoutEffect
  useLayoutEffect(() => {
    function getHeaderTitle() {
      const activeScreenName = navigationRef.current?.getCurrentRoute(); //current route object
      if (activeScreenName && activeScreenName.name) {
        return activeScreenName.name;
      }
      return '';
    }

    const headerTitle = getHeaderTitle();
    if (headerTitle !== '') {
      setTitle(headerTitle);
    } else if (props?.options.title) {
      setTitle(props.options.title);
    } else if (props?.options.headerTitle) {
      setTitle(props.options.headerTitle as string);
    }

    setCanGoBack(navigation.canGoBack());
  }, [navigation, props.options.title, props.options.headerTitle]);

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <Appbar.Header mode="center-aligned">
      {canGoBack ? (
        <Appbar.BackAction onPress={handleBack} />
      ) : (
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
