import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/access-denied');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
}

export default useAuth;
