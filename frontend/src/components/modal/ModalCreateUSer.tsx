/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */

import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Input from '../Input';
import { AppDispatch, RootState } from '../../store';
import { clearError, resetUser } from '../../store/registerSlice';
import register from '../../services/register';
import Button from '../buttons/Button';
import { closeModalCreateUser } from '../../store/modalCreateUserSlice';

function ModalCreateUser() {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalCreateUserOpen } = useSelector((state: RootState) => state.modalCreateUser);
  const { loading, user, error } = useSelector((state: RootState) => state.register);
  const [formData, setFormData] = useState({ photo: '', fullName: '', username: '', email: '', password: '', role: '' });
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeModalCreateUser());
        setFormData({ photo: '', fullName: '', username: '', email: '', password: '', role: '' });
        dispatch(clearError());
      }
    };

    if (isModalCreateUserOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalCreateUserOpen, dispatch]);

  useEffect(() => {
    if (user.id) {
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
        title: 'User created successfully',
      }).then(() => {
        dispatch(closeModalCreateUser());
        dispatch(resetUser());
      });
    }
  }, [dispatch, user.id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const isFormValid = confirmPassword === formData.password;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(register(formData));
    }
  };

  const handleCloseModal = () => {
    setFormData({ photo: '', fullName: '', username: '', email: '', password: '', role: '' });
    dispatch(closeModalCreateUser());
    dispatch(clearError());
  };

  const handleClickInside = (event: React.MouseEvent<HTMLFormElement>) => {
    event.stopPropagation();
  };

  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
      onClick={ handleCloseModal }
    >

      <form
        className="relative flex flex-col gap-6 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl"
        onSubmit={ handleSubmit }
        onClick={ handleClickInside }
      >

        <button
          className="absolute top-4 right-4 text-light-neutral-500 hover:text-light-neutral-700"
          onClick={ handleCloseModal }
          aria-label="Fechar modal"
        >

          <FaTimes
            className="hover:text-dark-neutral-600"
            size={ 24 }
          />

        </button>

        <h1
          className="font-bold text-center text-2xl text-light-neutral-900 my-4"
        >
          Add new user
        </h1>

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
          type="role"
          name="role"
          id="role"
          placeholder="Role"
          value={ formData.role }
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
          text="Create user"
          disabled={ !isFormValid }
        />

      </form>

    </div>
  );
}

export default ModalCreateUser;
