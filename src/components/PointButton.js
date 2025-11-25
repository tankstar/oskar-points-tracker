import { Pressable, StyleSheet, Text, View } from 'react-native';

const PointButton = ({ label, value, onPress }) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
    <View style={styles.content}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, value > 0 ? styles.positive : styles.negative]}>{value > 0 ? `+${value}` : value}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pressed: { opacity: 0.8 },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, color: '#0f172a', flex: 1, marginRight: 8 },
  value: { fontSize: 16, fontWeight: '700' },
  positive: { color: '#16a34a' },
  negative: { color: '#dc2626' },
});

export default PointButton;
