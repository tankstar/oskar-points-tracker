import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HistoryItem from '../../src/components/HistoryItem';
import { usePointsContext } from '../../src/providers/PointsProvider';

export default function HistoryScreen() {
  const { historyPoints, loading } = usePointsContext();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.heading}>History</Text>
      <Text style={styles.subheading}>Last 30 days of shared events.</Text>

      <View style={styles.section}>
        {historyPoints.length === 0 && !loading ? (
          <Text style={styles.empty}>No history yet. Start logging points today!</Text>
        ) : (
          historyPoints.map((entry) => <HistoryItem key={entry.id} entry={entry} />)
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  heading: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subheading: { color: '#475569', marginTop: 6 },
  section: { marginTop: 20 },
  empty: { color: '#94a3b8', fontStyle: 'italic' },
});
