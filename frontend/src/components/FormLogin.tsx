/* eslint-disable max-len */

'use client';

import { useEffect, useState } from 'react';
import AuthFooter from './AuthFooter';
import Button from './Button';
import Divider from './Divider';
import Input from './Input';
import KeepLogged from './KeepLogged';
import useLogin from '../hooks/useLogin';

function FormLogin() {
  const [formData, setFormaData] = useState({ username: '', password: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [keepLogged, setKeepLogged] = useState(false);
  const { setError, error, loading, fetchData } = useLogin({ ...formData, keepLogged });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    event.preventDefault();
    await fetchData();
  };

  useEffect(() => {
    const storedLogged = localStorage.getItem('keepLogged');
    setKeepLogged(storedLogged === 'true');
    setIsLoaded(true);
  }, []);

  const handleKeepLogged = () => {
    setKeepLogged((prev) => {
      const newValue = !prev;
      localStorage.setItem('keepLogged', JSON.stringify(newValue));
      return newValue;
    });
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <form
      onSubmit={ handleSubmit }
      className="flex flex-col gap-6 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl"
    >

      <h1
        className="font-bold text-center text-2xl text-light-neutral-900 my-4"
      >
        Welcome back
      </h1>

      <Input
        type="username"
        name="username"
        id="username"
        placeholder="Username"
        value={ formData.username }
        onChange={ handleInputChange }
      />

      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={ formData.password }
        error={ error }
        onChange={ handleInputChange }
      />

      <KeepLogged
        checked={ keepLogged }
        onChange={ handleKeepLogged }
      />

      <Button
        loading={ loading }
        text="Sign in"
      />

      <Divider />

      <AuthFooter
        forgotPassword="Forgot your password?"
        doNotHaveAccountText="Don't have an account?"
        doNotHaveAccountLinkTo="Register"
      />

    </form>
  );
}

export default FormLogin;
