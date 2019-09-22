import React from 'react';

const Notificaion = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notificaion;
