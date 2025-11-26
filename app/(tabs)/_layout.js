import { Tabs, useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/hooks/useAuth';

export default function TabsLayout() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth');
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#0f172a',
        tabBarActiveTintColor: '#2563eb',
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => <Ionicons name="sunny-outline" color={color} size={size} />,
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ paddingHorizontal: 14 }}>
              <Text style={{ color: '#2563eb', fontWeight: '700' }}>Logout</Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="week"
        options={{
          title: 'Week',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
