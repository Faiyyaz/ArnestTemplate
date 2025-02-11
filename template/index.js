/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React, {useRef} from 'react';
import {UserProvider} from './src/context/userContext';
import {darkTheme, lightTheme} from './src/styles/theme';
import {useColorScheme} from 'react-native';
import {PaperProvider, adaptNavigationTheme} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {navigationRef} from './src/navigators/RootNavigator';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/common/RNPToast';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {KeyboardProvider} from 'react-native-keyboard-controller';

const App1 = () => {
  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedLightTheme = merge(LightTheme, lightTheme);
  const CombinedDarkTheme = merge(DarkTheme, darkTheme);

  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  const routeNameRef = useRef();

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <SafeAreaProvider>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={
              paperTheme.dark === true ? 'light-content' : 'dark-content'
            }
          />
          <KeyboardProvider statusBarTranslucent>
            <UserProvider>
              <NavigationContainer
                onReady={() => {
                  const currentRouteName =
                    navigationRef.current.getCurrentRoute().name;
                  // Save the current route name for later comparision
                  routeNameRef.current = currentRouteName;
                }}
                onStateChange={async () => {
                  const previousRouteName = routeNameRef.current;
                  const currentRouteName =
                    navigationRef.current.getCurrentRoute().name;
                  if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                      screen_class: renameScreenName(currentRouteName),
                      screen_name: currentRouteName,
                    });
                    crashlytics().log(
                      `Screen Class: ${renameScreenName(currentRouteName)}`,
                    );
                  }

                  // Save the current route name for later comparision
                  routeNameRef.current = currentRouteName;
                }}
                ref={navigationRef}
                theme={paperTheme}>
                <App />
              </NavigationContainer>
            </UserProvider>
          </KeyboardProvider>
          <Toast position="bottom" config={toastConfig} />
        </SafeAreaProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => App1);
