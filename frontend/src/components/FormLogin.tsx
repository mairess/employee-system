/* eslint-disable max-len */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Image from 'next/image';
import AuthFooter from './AuthFooter';
import Button from './buttons/Button';
import Divider from './Divider';
import Input from './Input';
import KeepLogged from './KeepLogged';
import ModalChangePassword from './modal/ModalChangePassword';
import { AppDispatch, RootState } from '../store';
import auth from '../services/auth';
import { clearError } from '../store/authSlice';
import login from '../../public/login.svg';
import loginAvatar from '../../public/loginAvatar.svg';

function FormLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const { token, loading, error } = useSelector((state: RootState) => state.auth);
  const { isModalPasswordChangeOpen } = useSelector((state: RootState) => state.modalPasswordChange);
  const [formData, setFormaData] = useState({ username: '', password: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [keepLogged, setKeepLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    const storedLogged = localStorage.getItem('keepLogged');
    if (storedLogged !== null) { setKeepLogged(JSON.parse(storedLogged)); }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (token) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
      }).then(() => router.push('/dashboard-employees'));
    }
  }, [token, router]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(auth({ ...formData, keepLogged }));
  };

  const handleKeepLogged = () => {
    setKeepLogged((prev) => {
      const newValue = !prev;
      localStorage.setItem('keepLogged', JSON.stringify(newValue));
      return newValue;
    });
  };

  // review this, maybe interfering on loading page
  if (!isLoaded) return null;

  return (

    <div className="flex justify-center items-center w-fit mx-4">

      <div>
        <Image
          className="hidden sm:flex"
          src={ login }
          alt="Logo"
        />
      </div>

      {isModalPasswordChangeOpen && <ModalChangePassword />}

      <form
        className="flex flex-col gap-6 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl"
        onSubmit={ handleSubmit }
      >

        <div className="flex flex-col items-center justify-center">
          <h1
            className="font-bold text-center text-2xl text-light-neutral-900 my-4"
          >
            Welcome back
          </h1>

          <Image
            height={ 70 }
            width={ 70 }
            src={ loginAvatar }
            alt="Login avatar"
          />

        </div>

        <Input
          type="text"
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
          autocomplete="password"
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
          href="/register"
        />

      </form>

    </div>

  );
}

export default FormLogin;
