import React, { useEffect } from 'react';

interface ShowErrorProps {
  children: React.ReactNode;
  onHide: () => void;
  delay?: number;
  show: boolean;
}

const ShowError: React.FC<ShowErrorProps> = ({ children, onHide, delay = 5000, show }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, delay);

      return () => clearTimeout(timer);
    }
  }, [show, delay]);

  return <div>{children}</div>;
};

export default ShowError;
