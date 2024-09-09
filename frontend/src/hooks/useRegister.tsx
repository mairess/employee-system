import { useState } from 'react';
import fetchRegister from '../services/fetchRegister';

type UseRegisterProps = {
  fullName: string,
  username: string,
  email: string,
  password: string,
  role: string,
};

function useRegister({ fullName, username, email, password, role }: UseRegisterProps) {
  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchRegister({ fullName, username, email, password, role });

      const response = await data.json();

      if (!data.ok) {
        setError(response.message);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return { setError, error, loading, fetchData };
}

export default useRegister;
