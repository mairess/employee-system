import { useState } from 'react';
import fetchPasswordChange from '../services/fetchPasswordChange';

type UsePasswordChangeProps = {
  email: string,
};

function usePasswordChange({ email }:UsePasswordChangeProps) {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<{ message: string } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchPasswordChange({ email });

      const response = await data.json();

      if (!data.ok) {
        setError(response);
      }
      setConfirmation(response);
    } catch (err) {
      console.error(err);
      setError({ message: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return { setError, error, loading, fetchData, setConfirmation, confirmation };
}

export default usePasswordChange;
