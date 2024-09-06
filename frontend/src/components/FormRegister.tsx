/* eslint-disable max-len */

'use client';

import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Divider from './Divider';
import AuthFooter from './AuthFooter';

function FormRegister() {
  const [formData, setFormaData] = useState({ fullName: '', username: '', email: '', password: '', role: 'user' });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const isFormValid = confirmPassword !== formData.password;

  return (
    <form
      className="flex flex-col gap-6 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl"

    >
      <h1
        className="font-bold text-center text-2xl text-light-neutral-900 my-4"
      >
        Register
      </h1>

      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="Full name"
        value={ formData.fullName }
        onChange={ handleInputChange }
      />

      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        value={ formData.username }
        onChange={ handleInputChange }
      />

      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={ formData.email }
        onChange={ handleInputChange }
      />

      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={ formData.password }
        onChange={ handleInputChange }
      />

      <Input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm password"
        value={ confirmPassword }
        error={ formData.password !== confirmPassword ? { message: 'Password do not match!' } : null }
        onChange={ handleConfirmPassword }
      />

      <Button
        loading={ false }
        text="Sign up"
        disabled={ isFormValid }
      />

      <Divider />

      <AuthFooter
        doNotHaveAccountText="Already have an account?"
        doNotHaveAccountLinkTo="Login"
        onClick={ () => 'hello' }
        href="/"
      />

    </form>
  );
}

export default FormRegister;
