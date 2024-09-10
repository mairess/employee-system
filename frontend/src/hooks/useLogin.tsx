import { useState } from 'react';
import fetchLogin from '../services/fetchLogin';

type UseLoginProps = {
  username: string,
  password: string,
  keepLogged: boolean
};

function useLogin({ username, password, keepLogged }: UseLoginProps) {
  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchLogin({ username, password });

      const response = await data.json();

      if (!data.ok) {
        setError(response.message);
      }

      if (response?.token) {
        if (keepLogged) {
          localStorage.setItem('token', response.token);
        } else {
          sessionStorage.setItem('token', response.token);
        }
      }
      return response;
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return { setError, error, loading, fetchData };
}

export default useLogin;
