import { lightTheme, darkTheme } from '../theme/colors';

export const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];

export const PRIORITIES = [
  { label: 'Low', value: 'low', color: lightTheme.success },
  { label: 'Medium', value: 'medium', color: lightTheme.warning },
  { label: 'High', value: 'high', color: lightTheme.danger },
];

export const PRIORITY_COLORS = {
  low: lightTheme.success,
  medium: lightTheme.warning,
  high: lightTheme.danger,
};

export const STORAGE_KEY = '@todo_app_data';
export const SETTINGS_KEY = '@todo_app_settings';
