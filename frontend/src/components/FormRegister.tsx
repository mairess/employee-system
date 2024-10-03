/* eslint-disable max-len */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Input from './Input';
import Button from './buttons/Button';
import Divider from './Divider';
import AuthFooter from './AuthFooter';
import { AppDispatch, RootState } from '../store';
import register from '../services/register';
import { clearError } from '../store/registerSlice';
import registerIcon from '../../public/register.svg';
import registerAvatar from '../../public/registerAvatar.svg';

function FormRegister() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.register);
  const [formData, setFormaData] = useState({ photo: '', fullName: '', username: '', email: '', password: '', role: 'user' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, router]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const isFormValid = confirmPassword === formData.password;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      const resultAction = await dispatch(register(formData));

      if (register.fulfilled.match(resultAction)) {
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
          title: 'Registered successfully',
        }).then(() => {
          router.replace('/');
        });
      }
    }
  };

  return (

    <div className="flex justify-center items-center gap-4 w-fit mx-4">

      <div>
        <Image
          className="hidden sm:flex"
          src={ registerIcon }
          alt="Logo Register"
        />
      </div>

      <form
        className="flex flex-col gap-6 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl"
        onSubmit={ handleSubmit }
      >

        <div className="flex flex-col items-center justify-center">

          <h1
            className="font-bold text-center text-2xl text-light-neutral-900 my-4"
          >
            Register
          </h1>

          <Image
            height={ 70 }
            width={ 70 }
            src={ registerAvatar }
            alt="Login avatar"
          />

        </div>

        <Input
          type="text"
          name="photo"
          id="URL"
          placeholder="https://robohash.org/01.png"
          value={ formData.photo }
          error={ error }
          onChange={ handleInputChange }
        />

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

    </div>

  );
}

export default FormRegister;
