const Select = (props) => {
  const {
    name = '',
    labelKey = 'name',
    valueKey = 'value',
    options,
    selected,
    onChange,
  } = props;

  const handleChange = (event) => {
    const { value } = event.target;
    const option = options.find((item) => item[valueKey] === value) ?? null;
    onChange(option, event);
  };

  return (
    <select name={name} onChange={handleChange}>
      <option defaultValue={selected?.value} value="empty">
        Select option
      </option>
      {options.map((item) => (
        <option
          key={item.id}
          value={item[valueKey]}
          defaultValue={selected?.value}
        >
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
};

export default Select;
