import { useRef, useState } from 'react';

export const useForm = (form) => {
  const [, forceUpdate] = useState();

  const stateRef = useRef(form);

  const setValue = (key, value) => {
    stateRef.current[key] = value;
    forceUpdate({});
  };

  return [stateRef.current, setValue];
};
