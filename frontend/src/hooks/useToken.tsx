/* eslint-disable max-len */
import { useEffect, useState } from 'react';

function useToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokenStored = localStorage.getItem('token') || sessionStorage.getItem('token');
      setToken(tokenStored);
    }
  }, []);

  return token;
}

export default useToken;
