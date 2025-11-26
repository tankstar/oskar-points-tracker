import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PointButton from '../../src/components/PointButton';
import HistoryItem from '../../src/components/HistoryItem';
import { POSITIVE_POINTS, NEGATIVE_POINTS } from '../../src/utils/rules';
import { usePointsContext } from '../../src/providers/PointsProvider';

export default function TodayScreen() {
  const { todayPoints, addPoint, loading } = usePointsContext();
  const [comment, setComment] = useState('');

  const handleAdd = async (category) => {
    try {
      await addPoint({ category, comment });
      setComment('');
    } catch (error) {
      Alert.alert('Unable to save', error?.message ?? 'Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.heading}>Today</Text>
      <Text style={styles.subheading}>Log wins and bumps for the day.</Text>

      <Text style={styles.label}>Optional comment</Text>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Add context (homework, mood, etc.)"
        style={styles.input}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Positive</Text>
        {Object.entries(POSITIVE_POINTS).map(([key, info]) => (
          <PointButton key={key} label={info.label} value={info.value} onPress={() => handleAdd(key)} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Negative</Text>
        {Object.entries(NEGATIVE_POINTS).map(([key, info]) => (
          <PointButton key={key} label={info.label} value={info.value} onPress={() => handleAdd(key)} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today&apos;s log</Text>
        {todayPoints.length === 0 && !loading ? (
          <Text style={styles.empty}>No events yet. Log the first one!</Text>
        ) : (
          todayPoints.map((entry) => <HistoryItem key={entry.id} entry={entry} />)
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  heading: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subheading: { color: '#475569', marginTop: 6 },
  label: { marginTop: 16, marginBottom: 6, color: '#0f172a', fontWeight: '700' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  empty: { color: '#94a3b8', fontStyle: 'italic' },
});
