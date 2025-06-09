import { useEffect, useState } from 'react';
import { getFirstOptions, getSecondOptions } from '../api';
import Button from '../components/Button';
import Select from '../components/Select';
import ShowError from '../components/ShowError';
import { ThemeProvider } from '../context/theme';
import { useForm } from '../hooks';
import { saveSettings } from '../utils';

const HomePage = () => {
  const [theme, setTheme] = useState(window.appSettings.theme);

  const [firstOptions, setFirstOtions] = useState([]);
  const [selectedFirstOption, setSelectedFirstOption] = useState(null);

  const [error, setError] = useState('');

  const [secondOptions, setSecondOptions] = useState([]);
  const [selectedSecondOption, setSelectedSecondOption] = useState(null);

  const [nameForm, setName] = useForm({ firstName: '', lastName: '' });

  const getOptions = async () => {
    try {
      const data = await getFirstOptions();
      setFirstOtions(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  const onChangeFirstOption = async (value) => {
    setSelectedFirstOption(value);
    if (value == null) {
      setSelectedSecondOption(null);
    }

    const data = await getSecondOptions({ id: value.id });
    setSecondOptions(data);
  };

  const onChangeSecondOption = (value) => {
    setSelectedSecondOption(value);
  };

  const handleChangeNameForm = (event) => {
    const { name, value } = event.target;
    setName(name, value);
  };

  const onHideError = () => {
    setError('');
    getOptions();
  };

  const saveForm = (e) => {
    e.preventDefault();
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
          <span>Toggle them</span>
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
