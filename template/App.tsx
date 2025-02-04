import React from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import appStyles from './src/styles/styles';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={appStyles.pageContainer}>
      <StackNavigator />
    </GestureHandlerRootView>
  );
}

export default App;
