import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const ActionButton = ({label, value, onPress, type = 'positive'}) => {
  const display = value > 0 ? `+${value}` : value;
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        type === 'negative' ? styles.negative : styles.positive,
        pressed && styles.pressed,
      ]}>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{display}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  positive: {
    backgroundColor: '#d4f1d0',
    borderColor: '#3b7a2c',
    borderWidth: 1,
  },
  negative: {
    backgroundColor: '#fde2e1',
    borderColor: '#b0281a',
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.75,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
    paddingRight: 10,
  },
  value: {
    fontWeight: '700',
    color: '#111827',
  },
});

export default ActionButton;
