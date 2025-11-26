import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SummaryCard from '../../src/components/SummaryCard';
import HistoryItem from '../../src/components/HistoryItem';
import { usePointsContext } from '../../src/providers/PointsProvider';

const sumValues = (items) => items.reduce((acc, item) => acc + (item.value || 0), 0);

export default function WeekScreen() {
  const { weekPoints, weekTotal, weekReward } = usePointsContext();

  const positiveTotal = sumValues(weekPoints.filter((p) => p.value > 0));
  const negativeTotal = sumValues(weekPoints.filter((p) => p.value < 0));

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.heading}>This Week</Text>
      <Text style={styles.subheading}>Totals and rewards update instantly.</Text>

      <SummaryCard title="Weekly total" value={weekTotal} reward={weekReward} />
      <View style={styles.row}>
        <SummaryCard title="Positives" value={`+${positiveTotal}`} />
        <SummaryCard title="Negatives" value={negativeTotal} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Week log</Text>
        {weekPoints.length === 0 ? (
          <Text style={styles.empty}>No activity recorded for this week yet.</Text>
        ) : (
          weekPoints.map((entry) => <HistoryItem key={entry.id} entry={entry} />)
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  heading: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subheading: { color: '#475569', marginTop: 6 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  empty: { color: '#94a3b8', fontStyle: 'italic' },
  row: { flexDirection: 'row', gap: 12, marginTop: 12 },
});
