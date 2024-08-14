import React from 'react';
import { StatusBar, View } from 'react-native';
import AppNavigation from './src/Navigation/AppNavigation';

function App(): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <AppNavigation />
    </View>
  );
}

export default App;