import { StyleSheet, Text, View } from 'react-native';

const SummaryCard = ({ title, value, reward }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
    {reward ? <Text style={styles.reward}>{reward}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#e0f2fe',
    borderColor: '#bae6fd',
    borderWidth: 1,
    marginVertical: 8,
  },
  title: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  value: { fontSize: 32, fontWeight: '800', color: '#0284c7', marginTop: 8 },
  reward: { marginTop: 6, color: '#0369a1' },
});

export default SummaryCard;
