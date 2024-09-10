'use client';

import { useEffect, useState } from 'react';
import fetchEmployees from '../services/fetchEmployees';
import { EmployeeType } from '../types';

function useEmployees() {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeType[]>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokenLocal = localStorage.getItem('token') || '';
      const tokenSession = sessionStorage.getItem('token') || '';
      const storedToken = tokenLocal || tokenSession;
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchEmployees(token);

        const response = await data.json();

        if (!data.ok) {
          setError(response.message);
        }
        setEmployees(response);
      } catch (err) {
        console.error(err);
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { setError, error, loading, employees };
}

export default useEmployees;
