import { useEffect } from 'react';

const ShowError = (props) => {
  const { children, onHide, delay = 5000, show } = props;

  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, delay);

      return () => clearTimeout(timer);
    }
  }, [show, delay]);

  return <div>{children}</div>;
};

export default ShowError;
