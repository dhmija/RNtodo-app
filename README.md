# 📝 FlowTodo - React Native App

A modern, responsive task management application built with React Native and Expo. It allows users to organize their daily tasks with Notion-inspired UI, complete with categories, priorities, due dates, and dark mode support.

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)

---

## ✨ Features

- **Robust State Management**: Built with React Context API to ensure scalable and decoupled state handling.
- **Modern UI/UX**: Clean aesthetic with carefully selected typography, unified spacing, and micro-interactions.
- **Dark & Light Mode**: Seamless theming that adapts to user preference and persists across sessions.
- **Rich Task Properties**: Assign categories, priority levels, and due dates to keep tasks structured.
- **Filtering & Search**: Quickly find tasks matching text, status, category, or urgency.
- **Persistent Storage**: Securely saves data on-device using `@react-native-async-storage/async-storage`.

---

## 🛠️ Tech Stack

- React Native (Expo SDK 54)
- React Navigation (for future extensibility)
- `@react-native-async-storage/async-storage` for local cache
- `react-native-safe-area-context` for modern device notches
- `date-fns` for robust date formatting
- `@expo/vector-icons` for iconography (Feather, MaterialIcons)

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- Expo account (optional, for Expo Go)
- iOS Simulator or Android Emulator, or a physical device with Expo Go

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the app:
```bash
npx expo start
```
