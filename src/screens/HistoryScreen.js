import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HistoryItem from '../components/HistoryItem';
import { useRangePoints } from '../hooks/usePoints';

const HistoryScreen = () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const now = new Date();
  const { entries, loading } = useRangePoints(thirtyDaysAgo, now);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>History (30 days)</Text>
      <View style={styles.list}>
        {entries.map((entry) => (
          <HistoryItem key={entry.id} entry={entry} />
        ))}
        {!loading && entries.length === 0 ? (
          <Text style={styles.empty}>No entries yet. Add today to see the timeline fill up.</Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  list: { marginTop: 8 },
  empty: { color: '#475569', marginTop: 12 },
});

export default HistoryScreen;
