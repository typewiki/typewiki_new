import React from 'react';
import Header from './Header';

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
