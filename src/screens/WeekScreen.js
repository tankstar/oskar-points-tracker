import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ScoreCard from '../components/ScoreCard';
import {usePoints} from '../context/PointsContext';
import {getWeeklyResultText} from '../utils/points';

const WeekScreen = () => {
  const {weekSummary} = usePoints();
  const resultText = getWeeklyResultText(weekSummary.total);

  return (
    <View style={styles.container}>
      <ScoreCard
        title="Week total"
        value={weekSummary.total}
        subtitle={resultText}
      />
      <Text style={styles.sectionTitle}>Points per day (Mon-Sun)</Text>
      <FlatList
        data={weekSummary.days}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.day}>{item.label}</Text>
            <Text style={[styles.value, item.total < 0 ? styles.negative : styles.positive]}>
              {item.total > 0 ? `+${item.total}` : item.total}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
  },
  day: {
    fontSize: 16,
    color: '#1f2937',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
  positive: {
    color: '#0f766e',
  },
  negative: {
    color: '#b91c1c',
  },
});

export default WeekScreen;
