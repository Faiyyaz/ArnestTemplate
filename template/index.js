/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
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
          <UserProvider>
            <NavigationContainer ref={navigationRef} theme={paperTheme}>
              <App />
            </NavigationContainer>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => App1);
