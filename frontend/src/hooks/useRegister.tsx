/* eslint-disable max-params */
/* eslint-disable max-len */

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import register from '../services/register';

function useRegister() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, error } = useSelector((state: RootState) => state.user);
  console.log('call useRegister');

  const handleRegister = (userData: { fullName: string, username: string, email: string, password: string, role: string }) => {
    dispatch(register(userData));
  };

  return { handleRegister, loading, error, user };
}

export default useRegister;
