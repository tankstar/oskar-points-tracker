import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ScoreCard = ({title, value, subtitle}) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={[styles.value, value < 0 ? styles.negative : styles.positive]}>
      {value > 0 ? `+${value}` : value}
    </Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    color: '#374151',
    fontSize: 14,
  },
  value: {
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 8,
    color: '#111827',
  },
  subtitle: {
    color: '#4b5563',
  },
  positive: {
    color: '#0f766e',
  },
  negative: {
    color: '#b91c1c',
  },
});

export default ScoreCard;
