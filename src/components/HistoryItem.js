import { StyleSheet, Text, View } from 'react-native';

const HistoryItem = ({ entry }) => {
  const resolvedTimestamp = entry.timestamp || entry.createdAt?.toDate?.()?.toISOString();
  const readableDate = resolvedTimestamp ? new Date(resolvedTimestamp).toLocaleString() : entry.date;

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.category}>{entry.category}</Text>
        <Text style={styles.meta}>By {entry.createdBy ?? 'parent'} · {readableDate}</Text>
        {entry.comment ? <Text style={styles.comment}>{entry.comment}</Text> : null}
      </View>
      <Text style={[styles.value, entry.value > 0 ? styles.positive : styles.negative]}>
        {entry.value > 0 ? `+${entry.value}` : entry.value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  category: { fontSize: 15, color: '#0f172a', fontWeight: '700' },
  comment: { color: '#475569', marginTop: 4 },
  meta: { color: '#94a3b8', marginTop: 2 },
  value: { fontWeight: '700', marginLeft: 12 },
  positive: { color: '#16a34a' },
  negative: { color: '#dc2626' },
});

export default HistoryItem;
