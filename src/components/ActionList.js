import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {format} from '../utils/time';

const ActionList = ({data, emptyLabel = 'No actions yet'}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text style={styles.empty}>{emptyLabel}</Text>}
      renderItem={({item}) => (
        <View style={styles.row}>
          <View style={styles.rowTop}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={[styles.value, item.value < 0 ? styles.negative : styles.positive]}>
              {item.value > 0 ? `+${item.value}` : item.value}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>{format(item.date, 'YYYY-MM-DD')}</Text>
            <Text style={styles.meta}>{format(item.date, 'HH:mm')}</Text>
          </View>
          {item.comment ? <Text style={styles.comment}>{item.comment}</Text> : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#d1d5db',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
    paddingRight: 8,
  },
  value: {
    fontWeight: '700',
    fontSize: 16,
  },
  positive: {
    color: '#15803d',
  },
  negative: {
    color: '#b91c1c',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  meta: {
    color: '#6b7280',
    fontSize: 12,
  },
  comment: {
    marginTop: 4,
    color: '#374151',
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    paddingVertical: 12,
  },
});

export default ActionList;
