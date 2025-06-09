import { createContext } from 'react';
import { ThemeContextType } from '../hooks/useTheme';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ThemeContext.Provider;
