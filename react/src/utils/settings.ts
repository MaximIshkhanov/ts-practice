export const loadSettings = () => {
  try {
    const rawSettings = localStorage.getItem('app-settings');
    if (rawSettings == null) throw new Error();

    window.appSettings = JSON.parse(rawSettings);
  } catch {
    window.appSettings = {
      theme: 'light',
      requestDelay: 1000,
      requestChanceToSuccess: 0.4,
    };
  }
};

export const saveSettings = (key, settings) => {
  window.appSettings[key] = settings;
  localStorage.setItem('app-settings', JSON.stringify(window.appSettings));
};
