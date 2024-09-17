import { useEffect, useState } from 'react';

function useToken() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionStorageToken = sessionStorage.getItem('token') || '';
      const localStorageToken = localStorage.getItem('token') || '';
      const storedToken = sessionStorageToken || localStorageToken;
      setToken(storedToken);
    }
  }, []);

  return token;
}

export default useToken;
