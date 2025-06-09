import React from 'react';

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

interface SelectProps<T> {
  name?: string;
  labelKey?: keyof T;
  valueKey?: keyof T;
  options: T[];
  selected?: T | null;
  onChange: (selected: T | null, event: SelectChangeEvent) => void;
}

function Select<T extends Record<string, any>>({
  name = '',
  labelKey = 'name' as keyof T,
  valueKey = 'value' as keyof T,
  options,
  selected,
  onChange,
}: SelectProps<T>) {
  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const option = options.find((item) => String(item[valueKey]) === value) ?? null;
    onChange(option, event);
  };

  return (
    <select name={name} onChange={handleChange} value={selected?.[valueKey] ?? 'empty'}>
      <option value="empty" disabled>
        Select option
      </option>
      {options.map((item) => (
        <option key={String(item[valueKey])} value={String(item[valueKey])}>
          {String(item[labelKey])}
        </option>
      ))}
    </select>
  );
}

export default Select;
