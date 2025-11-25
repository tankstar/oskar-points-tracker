import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import PointButton from '../components/PointButton';
import HistoryItem from '../components/HistoryItem';
import { POSITIVE_POINTS, NEGATIVE_POINTS } from '../utils/rules';
import { addPointEvent } from '../services/pointsService';
import { useTodayPoints } from '../hooks/usePoints';
import SummaryCard from '../components/SummaryCard';

const TodayScreen = () => {
  const [comment, setComment] = useState('');
  const { entries, total } = useTodayPoints();

  const handlePress = async (category, value) => {
    try {
      await addPointEvent({ category, value, comment });
      setComment('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Today</Text>
      <SummaryCard title="Total" value={total} />

      <Text style={styles.section}>Positive</Text>
      {Object.entries(POSITIVE_POINTS).map(([key, item]) => (
        <PointButton key={key} label={item.label} value={item.value} onPress={() => handlePress(key, item.value)} />
      ))}

      <Text style={styles.section}>Negative</Text>
      {Object.entries(NEGATIVE_POINTS).map(([key, item]) => (
        <PointButton key={key} label={item.label} value={item.value} onPress={() => handlePress(key, item.value)} />
      ))}

      <Text style={styles.section}>Comment (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a note"
        value={comment}
        onChangeText={setComment}
      />

      <Text style={styles.section}>Latest</Text>
      {entries.map((entry) => (
        <HistoryItem key={entry.id} entry={entry} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  section: { marginTop: 18, marginBottom: 6, fontSize: 16, fontWeight: '600', color: '#0f172a' },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f8fafc',
  },
});

export default TodayScreen;
