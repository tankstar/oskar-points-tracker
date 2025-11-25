import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SummaryCard from '../components/SummaryCard';
import HistoryItem from '../components/HistoryItem';
import { useWeekPoints } from '../hooks/usePoints';

const WeekScreen = () => {
  const today = new Date();
  const startOfWeek = useMemo(() => {
    const d = new Date(today);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d;
  }, [today]);

  const endOfWeek = useMemo(() => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + 6);
    return d;
  }, [startOfWeek]);

  const { entries, total, reward } = useWeekPoints(startOfWeek, endOfWeek);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Week</Text>
      <SummaryCard title="Total" value={total} reward={reward} />
      <View style={styles.list}>
        {entries.map((entry) => (
          <HistoryItem key={entry.id} entry={entry} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  list: { marginTop: 12 },
});

export default WeekScreen;
