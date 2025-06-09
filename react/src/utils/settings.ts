interface AppSettings {
  theme: 'light' | 'dark';
  requestDelay: number;
  requestChanceToSuccess: number;
}

declare global {
  interface Window {
    appSettings: AppSettings;
  }
}

export const loadSettings = (): void => {
  try {
    const rawSettings = localStorage.getItem('app-settings');
    if (rawSettings == null) throw new Error();

    const parsed = JSON.parse(rawSettings);

    if (
      typeof parsed.theme === 'string' &&
      typeof parsed.requestDelay === 'number' &&
      typeof parsed.requestChanceToSuccess === 'number'
    ) {
      window.appSettings = parsed;
    } else {
      throw new Error();
    }
  } catch {
    window.appSettings = {
      theme: 'light',
      requestDelay: 1000,
      requestChanceToSuccess: 0.4,
    };
  }
};

export const saveSettings = <K extends keyof AppSettings>(
  key: K,
  value: AppSettings[K]
): void => {
  window.appSettings[key] = value;
  localStorage.setItem('app-settings', JSON.stringify(window.appSettings));
};
