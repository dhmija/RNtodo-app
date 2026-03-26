import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTodo } from '../context/TodoContext';
import { CATEGORIES, PRIORITIES } from '../utils/constants';
import { typography } from '../theme/typography';

const TodoFormModal = ({ visible, onClose, editingTodo }) => {
  const { theme } = useTheme();
  const { addTodo, updateTodo } = useTodo();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [priority, setPriority] = useState(PRIORITIES[1].value); // default medium
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (visible) {
      if (editingTodo) {
        setTitle(editingTodo.title);
        setDescription(editingTodo.description || '');
        setCategory(editingTodo.category);
        setPriority(editingTodo.priority);
        setDueDate(editingTodo.dueDate || '');
      } else {
        resetForm();
      }
    }
  }, [visible, editingTodo]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory(CATEGORIES[1]); // Personal
    setPriority('medium');
    setDueDate('');
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const todoData = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: dueDate.trim() || null,
    };

    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
    } else {
      addTodo(todoData);
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[typography.h2, { color: theme.text }]}>
              {editingTodo ? 'Edit Task' : 'New Task'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={24} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            <Text style={[typography.caption, styles.label, { color: theme.textSecondary }]}>Title</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
              placeholder="e.g. Design new landing page"
              placeholderTextColor={theme.textSecondary}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={[typography.caption, styles.label, { color: theme.textSecondary }]}>Description</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border },
              ]}
              placeholder="Add more details..."
              placeholderTextColor={theme.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={[typography.caption, styles.label, { color: theme.textSecondary }]}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollSelect}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: category === cat ? theme.primary : theme.surface,
                      borderColor: category === cat ? theme.primary : theme.border,
                    },
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[typography.bodySmall, { color: category === cat ? '#FFF' : theme.text }]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[typography.caption, styles.label, { color: theme.textSecondary }]}>Priority</Text>
            <View style={styles.rowSelect}>
              {PRIORITIES.map((p) => (
                <TouchableOpacity
                  key={p.value}
                  style={[
                    styles.chip,
                    styles.flexChip,
                    {
                      backgroundColor: priority === p.value ? p.color : theme.surface,
                      borderColor: priority === p.value ? p.color : theme.border,
                    },
                  ]}
                  onPress={() => setPriority(p.value)}
                >
                  <Text style={[typography.bodySmall, { color: priority === p.value ? '#FFF' : theme.text }]}>
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[typography.caption, styles.label, { color: theme.textSecondary }]}>
              Due Date (YYYY-MM-DD)
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
              placeholder="e.g. 2026-05-20"
              placeholderTextColor={theme.textSecondary}
              value={dueDate}
              onChangeText={setDueDate}
            />
          </ScrollView>

          <View style={[styles.footer, { borderTopColor: theme.border }]}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={onClose}
            >
              <Text style={[typography.h3, { color: theme.text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton, { backgroundColor: theme.primary, opacity: title.trim() ? 1 : 0.5 }]}
              onPress={handleSave}
              disabled={!title.trim()}
            >
              <Text style={[typography.h3, { color: '#FFF' }]}>
                {editingTodo ? 'Save Changes' : 'Add Task'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 20,
  },
  bodyContent: {
    paddingBottom: 40,
  },
  label: {
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  scrollSelect: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  rowSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  chip: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexChip: {
    flex: 1,
    marginRight: 0,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  primaryButton: {
    borderWidth: 0,
  },
});

export default TodoFormModal;
