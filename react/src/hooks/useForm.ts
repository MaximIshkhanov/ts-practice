import { useRef, useState } from 'react';

type SetValue<T> = (key: keyof T, value: T[keyof T]) => void;

export function useForm<T extends Record<string, any>>(form: T): [T, SetValue<T>] {
  const [, forceUpdate] = useState({});

  const stateRef = useRef<T>(form);

  const setValue: SetValue<T> = (key, value) => {
    stateRef.current[key] = value;
    forceUpdate({});
  };

  return [stateRef.current, setValue];
}