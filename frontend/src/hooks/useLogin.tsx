import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import login from '../services/login';

function useLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = (username: string, password: string, keepLogged: boolean) => {
    dispatch(login({ username, password, keepLogged }));
  };
  return { token, loading, error, handleLogin };
}

export default useLogin;
