import { createContext } from 'react';

export const ThemeContext = createContext(['light', () => null]);
export const ThemeProvider = ThemeContext.Provider;
