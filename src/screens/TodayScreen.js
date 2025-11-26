import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import ActionButton from '../components/ActionButton';
import ActionList from '../components/ActionList';
import ScoreCard from '../components/ScoreCard';
import {usePoints} from '../context/PointsContext';
import {negativeActions, positiveActions} from '../utils/points';

const TodayScreen = () => {
  const {addAction, actions, todayTotal} = usePoints();
  const [comment, setComment] = useState('');

  const todayActions = useMemo(() => {
    const today = new Date();
    return actions.filter(item => {
      const date = new Date(item.date);
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    });
  }, [actions]);

  const handleAdd = (label, value) => {
    addAction({label, value, comment});
    setComment('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScoreCard title="Today's total" value={todayTotal} />
      <View style={styles.commentBox}>
        <Text style={styles.commentLabel}>Optional comment</Text>
        <TextInput
          placeholder="Add a note to the next action"
          value={comment}
          onChangeText={setComment}
          style={styles.commentInput}
        />
      </View>
      <Text style={styles.sectionTitle}>Positive points</Text>
      {positiveActions.map(item => (
        <ActionButton
          key={item.label}
          label={item.label}
          value={item.value}
          onPress={() => handleAdd(item.label, item.value)}
          type="positive"
        />
      ))}
      <Text style={styles.sectionTitle}>Negative points</Text>
      {negativeActions.map(item => (
        <ActionButton
          key={item.label}
          label={item.label}
          value={item.value}
          onPress={() => handleAdd(item.label, item.value)}
          type="negative"
        />
      ))}
      <Text style={styles.sectionTitle}>Today&apos;s actions</Text>
      <ActionList data={todayActions} emptyLabel="No actions logged today." />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    color: '#111827',
  },
  commentBox: {
    marginBottom: 8,
  },
  commentLabel: {
    color: '#374151',
    marginBottom: 6,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f9fafb',
  },
});

export default TodayScreen;
