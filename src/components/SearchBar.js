import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTodo } from '../context/TodoContext';

const SearchBar = () => {
  const { theme } = useTheme();
  const { searchQuery, setSearchQuery } = useTodo();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.inputContainer, { backgroundColor: theme.surface }]}>
        <Feather name="search" size={20} color={theme.textSecondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Search tasks..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 ? (
          <Feather
            name="x-circle"
            size={20}
            color={theme.textSecondary}
            style={styles.clearIcon}
            onPress={() => setSearchQuery('')}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 10,
  },
  clearIcon: {
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
