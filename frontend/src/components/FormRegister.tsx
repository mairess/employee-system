/* eslint-disable max-len */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from './Button';
import Divider from './Divider';
import AuthFooter from './AuthFooter';
import useRegister from '../hooks/useRegister';

function FormRegister() {
  const [formData, setFormaData] = useState({ fullName: '', username: '', email: '', password: '', role: 'user' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setError, error, loading, fetchData } = useRegister({ ...formData });
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const isFormValid = confirmPassword === formData.password;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    event.preventDefault();
    const data = await fetchData();

    if ('id' in data) {
      router.push('/');
    }
  };

  return (
    <form
      className="flex flex-col gap-6 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl"
      onSubmit={ handleSubmit }
    >
      <h1
        className="font-bold text-center text-2xl text-light-neutral-900 my-4"
      >
        Register
      </h1>

      <Input
        type="text"
        name="fullName"
        id="full-name"
        placeholder="Full name"
        value={ formData.fullName }
        error={ error }
        onChange={ handleInputChange }
      />

      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        value={ formData.username }
        error={ error }
        onChange={ handleInputChange }
      />

      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={ formData.email }
        error={ error }
        onChange={ handleInputChange }
      />

      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={ formData.password }
        error={ error }
        autocomplete="new-password"
        onChange={ handleInputChange }
      />

      <Input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm password"
        value={ confirmPassword }
        error={ formData.password !== confirmPassword ? 'Password do not match!' : null }
        autocomplete="confirm-password"
        onChange={ handleConfirmPassword }
      />

      <Button
        loading={ loading }
        text="Sign up"
        disabled={ !isFormValid }
      />

      <Divider />

      <AuthFooter
        doNotHaveAccountText="Already have an account?"
        doNotHaveAccountLinkTo="Login"
        href="/"
      />

    </form>
  );
}

export default FormRegister;
