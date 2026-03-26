import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { format, isPast } from 'date-fns';
import { useTheme } from '../context/ThemeContext';
import { useTodo } from '../context/TodoContext';
import { PRIORITY_COLORS } from '../utils/constants';
import { typography } from '../theme/typography';

const TodoItem = ({ item, onEdit }) => {
  const { theme } = useTheme();
  const { toggleTodo, deleteTodo } = useTodo();

  const priorityColor = PRIORITY_COLORS[item.priority] || theme.textSecondary;
  const isOverdue = item.dueDate && isPast(new Date(item.dueDate)) && !item.completed;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surface, shadowColor: theme.shadow },
        item.completed && styles.completedContainer,
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={() => toggleTodo(item.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            { borderColor: priorityColor },
            item.completed && { backgroundColor: priorityColor },
          ]}
        >
          {item.completed ? <Feather name="check" size={16} color="#FFF" /> : null}
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              typography.h3,
              { color: theme.text },
              item.completed && { textDecorationLine: 'line-through', color: theme.textSecondary },
            ]}
          >
            {item.title}
          </Text>
          
          {item.description ? (
            <Text
              style={[
                typography.bodySmall,
                { color: theme.textSecondary, marginTop: 4 },
                item.completed && { textDecorationLine: 'line-through' },
              ]}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          ) : null}

          <View style={styles.metaContainer}>
            <View style={[styles.badge, { backgroundColor: theme.surfaceHighlight }]}>
              <Text style={[typography.caption, { color: priorityColor }]}>
                {item.category}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: priorityColor }]}>
              <Text style={[typography.caption, { color: '#FFF' }]}>
                {item.priority.toUpperCase()}
              </Text>
            </View>
            {item.dueDate ? (
              <View style={styles.dateContainer}>
                <Feather
                  name="calendar"
                  size={12}
                  color={isOverdue ? theme.danger : theme.textSecondary}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[
                    typography.caption,
                    { color: isOverdue ? theme.danger : theme.textSecondary },
                  ]}
                >
                  {format(new Date(item.dueDate), 'MMM d, yyyy')}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onEdit(item)}>
          <Feather name="edit-2" size={20} color={theme.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => deleteTodo(item.id)}>
          <Feather name="trash-2" size={20} color={theme.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completedContainer: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  actionBtn: {
    padding: 8,
    marginLeft: 4,
  },
});

export default TodoItem;
