import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TodayScreen from '../screens/TodayScreen';
import WeekScreen from '../screens/WeekScreen';
import HistoryScreen from '../screens/HistoryScreen';
import AuthScreen from '../screens/AuthScreen';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/authService';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: '#ffffff' },
};

const LogoutButton = () => (
  <TouchableOpacity onPress={logout} style={{ paddingHorizontal: 8 }}>
    <Ionicons name="log-out-outline" size={22} color="#0f172a" />
  </TouchableOpacity>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerRight: () => <LogoutButton />, 
      tabBarIcon: ({ color, size }) => {
        const iconMap = {
          Today: 'sunny-outline',
          Week: 'calendar-outline',
          History: 'time-outline',
        };
        return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#0f172a',
      tabBarInactiveTintColor: '#94a3b8',
    })}
  >
    <Tab.Screen name="Today" component={TodayScreen} />
    <Tab.Screen name="Week" component={WeekScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
