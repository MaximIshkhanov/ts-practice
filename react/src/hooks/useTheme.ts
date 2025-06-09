import { useContext } from 'react';
import { ThemeContext } from '../context/theme';

export type ThemeContextType = [
  'light' | 'dark',
  React.Dispatch<React.SetStateAction<'light' | 'dark'>>
];

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
