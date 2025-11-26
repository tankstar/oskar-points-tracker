import React, {useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthScreen from '../screens/AuthScreen';
import TodayScreen from '../screens/TodayScreen';
import WeekScreen from '../screens/WeekScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#2563eb',
      tabBarLabelStyle: {fontWeight: '700'},
    }}>
    <Tab.Screen name="Today" component={TodayScreen} />
    <Tab.Screen name="Week" component={WeekScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!signedIn ? (
          <Stack.Screen name="Auth">
            {() => <AuthScreen onLogin={() => setSignedIn(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
