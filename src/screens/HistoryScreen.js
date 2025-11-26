import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ActionList from '../components/ActionList';
import {usePoints} from '../context/PointsContext';

const HistoryScreen = () => {
  const {history} = usePoints();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 30 days</Text>
      <ActionList data={history} emptyLabel="No recent actions." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
});

export default HistoryScreen;
