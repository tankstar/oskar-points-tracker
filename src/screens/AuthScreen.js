import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { signIn, register } from '../services/authService';

const DEFAULT_ACCOUNTS = [
  { label: 'Mom (example)', email: 'mom@example.com' },
  { label: 'Dad (example)', email: 'dad@example.com' },
];

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signIn');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) throw new Error('Email and password are required');
      if (mode === 'signIn') {
        await signIn(email.trim(), password);
      } else {
        await register(email.trim(), password);
      }
    } catch (error) {
      Alert.alert('Authentication error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <Text style={styles.heading}>Oskar Points</Text>
        <Text style={styles.subheading}>Mom & Dad login</Text>

        <View style={styles.quickRow}>
          {DEFAULT_ACCOUNTS.map((account) => (
            <TouchableOpacity
              key={account.email}
              style={styles.quickButton}
              onPress={() => setEmail(account.email)}
              disabled={loading}
            >
              <Text style={styles.quickText}>{account.label}</Text>
              <Text style={styles.quickEmail}>{account.email}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="mom@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            editable={!loading}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
          <TextInput
            placeholder="Minimum 6 characters"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            editable={!loading}
          />

          <TouchableOpacity style={styles.submit} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.submitText}>{loading ? 'Please wait…' : mode === 'signIn' ? 'Sign in' : 'Create account'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMode(mode === 'signIn' ? 'register' : 'signIn')} disabled={loading}>
            <Text style={styles.toggle}>
              {mode === 'signIn' ? 'Need to register?' : 'Already have an account? Sign in'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f1f5f9' },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  heading: { fontSize: 32, fontWeight: '800', color: '#0f172a', textAlign: 'center' },
  subheading: { textAlign: 'center', color: '#475569', marginBottom: 24 },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: { fontWeight: '600', color: '#0f172a', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8fafc',
  },
  submit: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 18,
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  toggle: { textAlign: 'center', color: '#2563eb', marginTop: 14, fontWeight: '600' },
  quickRow: { flexDirection: 'row', gap: 12, marginBottom: 18, flexWrap: 'wrap' },
  quickButton: {
    backgroundColor: '#e2e8f0',
    padding: 10,
    borderRadius: 10,
    flexGrow: 1,
    minWidth: '45%',
  },
  quickText: { fontWeight: '700', color: '#0f172a' },
  quickEmail: { color: '#475569', marginTop: 2 },
});

export default AuthScreen;
