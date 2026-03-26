import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTodo } from '../context/TodoContext';
import { typography } from '../theme/typography';

const StatsPanel = () => {
  const { theme } = useTheme();
  const { stats } = useTodo();

  const renderStatItem = (value, label, color) => (
    <View style={styles.statItem}>
      <Text style={[typography.h2, { color: color || theme.text }]}>{value}</Text>
      <Text style={[typography.caption, { color: theme.textSecondary, marginTop: 4 }]}>
        {label}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      {renderStatItem(stats.total, 'Total')}
      {renderStatItem(stats.completed, 'Completed', theme.success)}
      {renderStatItem(stats.active, 'Active', theme.secondary)}
      {renderStatItem(stats.highPriority, 'High Priority', theme.danger)}
      {renderStatItem(stats.overdue, 'Overdue', theme.warning)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  statItem: {
    alignItems: 'center',
  },
});

export default StatsPanel;
