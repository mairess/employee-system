import { useState } from 'react';
import fetchLogin from '../services/fetchLogin';

type FetchLoginProps = {
  username: string,
  password: string,
  keepLogged: boolean
};

function useLogin({ username, password, keepLogged }: FetchLoginProps) {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchLogin({ username, password });

      if (!data.ok) {
        const response = await data.json();
        setError(response);
      }

      const response = await data.json();

      if (response?.token) {
        if (keepLogged) {
          localStorage.setItem('token', JSON.stringify(response.token));
        } else {
          sessionStorage.setItem('token', JSON.stringify(response.token));
        }
      }
    } catch (err) {
      console.error(err);
      setError({ message: 'Failed to fetch.' });
    } finally {
      setLoading(false);
    }
  };

  return { setError, error, loading, fetchData };
}

export default useLogin;
