import { useState, useEffect } from 'react';

function ErrorButton() {
  const [throwError, setThrowError] = useState<boolean>(false);

  useEffect(() => {
    if (throwError) {
      throw new Error('Throw ErrorBoundary!');
    }
  }, [throwError]);

  function handleClick() {
    setThrowError(true);
  }

  return <button onClick={handleClick}>ErrorBoundary</button>;
}

export default ErrorButton;
