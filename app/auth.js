import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';

const QUICK_EMAILS = {
  dad: 'dad@example.com',
  mom: 'mom@example.com',
};

export default function AuthScreen() {
  const { user, signIn, register, initializing } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signin');
  const [busy, setBusy] = useState(false);

  if (!initializing && user) {
    return <Redirect href="/(tabs)/today" />;
  }

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter email and password.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signin') {
        await signIn(email.trim(), password.trim());
      } else {
        await register(email.trim(), password.trim());
      }
    } catch (err) {
      Alert.alert('Auth error', err?.message ?? 'Check your credentials and try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Mom & Dad Login</Text>
        <Text style={styles.subtitle}>Track points together in real time.</Text>

        <View style={styles.quickRow}>
          {Object.entries(QUICK_EMAILS).map(([label, value]) => (
            <TouchableOpacity key={label} style={styles.chip} onPress={() => setEmail(value)}>
              <Text style={styles.chipText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="parent@example.com"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Minimum 6 characters"
          style={styles.input}
        />

        <TouchableOpacity style={[styles.primaryButton, busy && styles.disabledButton]} onPress={handleAuth} disabled={busy}>
          <Text style={styles.primaryText}>{mode === 'signin' ? 'Sign in' : 'Register'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMode(mode === 'signin' ? 'register' : 'signin')}>
          <Text style={styles.link}>{mode === 'signin' ? 'Need an account? Register' : 'Have an account? Sign in'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  title: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subtitle: { marginTop: 8, color: '#475569', fontSize: 16 },
  quickRow: { flexDirection: 'row', marginTop: 20, gap: 10 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
  },
  chipText: { color: '#0f172a', fontWeight: '700' },
  label: { marginTop: 16, marginBottom: 6, color: '#0f172a', fontWeight: '700' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
  },
  primaryButton: {
    marginTop: 24,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  primaryText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  link: { marginTop: 14, textAlign: 'center', color: '#2563eb', fontWeight: '700' },
  disabledButton: { opacity: 0.7 },
});
