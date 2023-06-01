import React from 'react';
import { useRouteError } from 'react-router-dom';

const InvalidPage = (props) => {
  const error = useRouteError();

  return (
    <>
      <h1>
        {error.statusText} {error.message}
      </h1>
      <p>{error.error.message}</p>
    </>
  );
};

export default InvalidPage;
