import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../utils/constants';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTodos();
    }
  }, [todos, isLoaded]);

  const loadTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setTodos(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Error loading todos:', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveTodos = async () => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Error saving todos:', e);
    }
  };

  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      ...todoData,
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodo = (id, updatedData) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
    );
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : null,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getFilteredTodos = () => {
    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.description &&
          todo.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        filterCategory === 'All' || todo.category === filterCategory;
      const matchesPriority =
        filterPriority === 'All' || todo.priority === filterPriority;
      const matchesStatus =
        filterStatus === 'All' ||
        (filterStatus === 'Completed' && todo.completed) ||
        (filterStatus === 'Active' && !todo.completed);

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
    highPriority: todos.filter((t) => t.priority === 'high' && !t.completed).length,
    overdue: todos.filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length,
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos: getFilteredTodos(),
        stats,
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
        filterPriority,
        setFilterPriority,
        filterStatus,
        setFilterStatus,
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
