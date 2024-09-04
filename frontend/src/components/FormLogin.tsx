/* eslint-disable max-len */

'use client';

import AuthFooter from './AuthFooter';
import Button from './Button';
import Divider from './Divider';
import Input from './Input';
import KeepLogged from './KeepLogged';

function FormLogin() {
  return (
    <form
      className="flex flex-col gap-4 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl"
    >

      <h1
        className="font-bold text-center text-2xl text-light-neutral-900 my-4"
      >
        Welcome back
      </h1>

      <Input
        type="email"
        name="password"
        id="password"
        placeholder="Email"
      />

      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />

      <KeepLogged />

      <Button text="Sign in" />

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
