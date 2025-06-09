import { delay } from '../utils';
import { MOCK_FIST_OPTIONS, MOCK_SECOND_OPTIONS } from './mock';

export const request = async (path, data) => {
  await delay(window.appSettings.requestDelay);
  const chanceToSuccess = Math.random();
  if (
    path === '/first' &&
    chanceToSuccess > window.appSettings.requestChanceToSuccess
  ) {
    return Promise.resolve(MOCK_FIST_OPTIONS);
  }
  if (path === '/second') {
    return Promise.resolve(MOCK_SECOND_OPTIONS[data.id]);
  }
  return Promise.reject('Something went wrong...');
};
