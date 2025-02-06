import React from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import appStyles from './src/styles/styles';
import {View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={appStyles.pageContainer}>
      <StackNavigator />
    </View>
  );
}

export default App;
