import { useEffect, useState } from 'react';
import { getFirstOptions, getSecondOptions } from '../api';
import Button from '../components/Button';
import Select from '../components/Select';
import ShowError from '../components/ShowError';
import { ThemeProvider } from '../context/theme';
import { useForm } from '../hooks';
import { saveSettings } from '../utils';

interface Option {
  id: number;
  value: string;
  name?: string;
  label?: string;
}

const HomePage = () => {

  function isValidId(id: number): id is 1 | 2 | 3 {
    return id === 1 || id === 2 || id === 3;
  }
  
  const [theme, setTheme] = useState<'light' | 'dark'>(window.appSettings.theme);

  const [firstOptions, setFirstOptions] = useState<Option[]>([]);
  const [selectedFirstOption, setSelectedFirstOption] = useState<Option | null>(null);

  const [error, setError] = useState<string>('');

  const [secondOptions, setSecondOptions] = useState<Option[]>([]);
  const [selectedSecondOption, setSelectedSecondOption] = useState<Option | null>(null);

  const [nameForm, setName] = useForm({ firstName: '', lastName: '' });

  const getOptions = async () => {
    try {
      const data = await getFirstOptions();
      setFirstOptions(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  const onChangeFirstOption = async (value: Option | null) => {
  setSelectedFirstOption(value);
  if (value == null) {
    setSelectedSecondOption(null);
    return;
  }

  if (isValidId(value.id)) {
    const data = await getSecondOptions({ id: value.id });
    setSecondOptions(data);
  } else {
    setSecondOptions([]);
  }
};

  const onChangeSecondOption = (value: Option | null) => {
    setSelectedSecondOption(value);
  };

  const handleChangeNameForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setName(name as 'firstName' | 'lastName', value);
  };

  const onHideError = () => {
    setError('');
    getOptions();
  };

  const saveForm = (e: React.FormEvent) => {
    e.preventDefault();
    // логика сохранения формы
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      saveSettings('theme', next);
      return next;
    });
  };

  return (
    <ThemeProvider value={[theme, setTheme]}>
      <form>
        <div>
          Select first type:&nbsp;
          <Select
            options={firstOptions}
            selected={selectedFirstOption}
            onChange={onChangeFirstOption}
          />
        </div>
        {selectedFirstOption != null && (
          <div>
            Select second type:&nbsp;
            <Select
              labelKey="label"
              options={secondOptions}
              selected={selectedSecondOption}
              onChange={onChangeSecondOption}
            />
          </div>
        )}
        <br />
        <div>
          <div>
            First Name&nbsp;
            <input
              type="text"
              name="firstName"
              value={nameForm.firstName}
              onChange={handleChangeNameForm}
            />
          </div>
          <br />
          <div>
            Last Name&nbsp;
            <input
              type="text"
              name="lastName"
              value={nameForm.lastName}
              onChange={handleChangeNameForm}
            />
          </div>
        </div>
        <br />
        <Button variant="secondary" onClick={toggleTheme}>
          <span>Toggle theme</span>
        </Button>
        &nbsp;
        <Button
          variant="secondary"
          onClick={saveForm}
          type="submit"
          disabled={error !== ''}
        >
          <span>Save form</span>
        </Button>
        <br />
        <ShowError delay={1000} show={error !== ''} onHide={onHideError}>
          <p>{error}</p>
        </ShowError>
      </form>
    </ThemeProvider>
  );
};

export default HomePage;
