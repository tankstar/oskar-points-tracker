import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {PointsProvider} from './src/context/PointsContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <PointsProvider>
        <StatusBar barStyle="dark-content" />
        <View style={{flex: 1}}>
          <AppNavigator />
        </View>
      </PointsProvider>
    </SafeAreaProvider>
  );
};

export default App;
