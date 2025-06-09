import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import { loadSettings, saveSettings } from './utils';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
    setIsLoading(false);
  }, []);
  return <div>{isLoading ? <p>Loading....</p> : <HomePage />}</div>;
};
