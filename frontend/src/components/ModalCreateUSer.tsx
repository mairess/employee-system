/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Input from './Input';
import { AppDispatch, RootState } from '../store';
import { clearError } from '../store/registerSlice';
import register from '../services/register';
import Button from './buttons/Button';
import { closeModal } from '../store/modalPasswordChangeSlice';

function ModalCreateUser() {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalOpen } = useSelector((state: RootState) => state.modalPasswordChange);
  const { loading, user, error } = useSelector((state: RootState) => state.register);
  const [formData, setFormData] = useState({ photo: '', fullName: '', username: '', email: '', password: '', role: '' });
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeModal());
        setFormData({ photo: '', fullName: '', username: '', email: '', password: '', role: '' });
        dispatch(clearError());
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, dispatch]);

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

    if (user.id) {
      dispatch(closeModal());
    }
  };

  const handleCloseModal = () => {
    setFormData({ photo: '', fullName: '', username: '', email: '', password: '', role: '' });
    dispatch(closeModal());
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
        className="relative flex flex-col gap-6 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl mt-60 mb-6 sm:m-0"
        onSubmit={ handleSubmit }
        onClick={ handleClickInside }
      >

        <button
          className="absolute top-4 right-4 text-light-neutral-500 hover:text-light-neutral-700"
          onClick={ handleCloseModal }
          aria-label="Fechar modal"
        >

          <FaTimes size={ 24 } />

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
          placeholder="Photo url"
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
