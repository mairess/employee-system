/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import Button from './buttons/Button';
import { AppDispatch, RootState } from '../store';
import passwordChange from '../services/passwordChange';
import { clearError } from '../store/passwordChangeSlice';
import { closeModal } from '../store/modalPasswordChangeSlice';

function ModalChangePassword() {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalOpen } = useSelector((state: RootState) => state.modalPasswordChange);
  const { loading, message, error } = useSelector((state: RootState) => state.passwordChange);
  const [formData, setFormData] = useState({ email: '' });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeModal());
        setFormData({ email: '' });
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

  const isFormValid = !formData.email;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleCloseModal = () => {
    setFormData({ email: '' });
    dispatch(closeModal());
    dispatch(clearError());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearError());
    dispatch(passwordChange(formData.email));
  };

  const handleClickInside = (event: React.MouseEvent<HTMLFormElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={ handleCloseModal }
    >

      <form
        className="relative flex flex-col items-center py-14 px-6 bg-light-neutral-100 gap-4 rounded-lg"
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
          className="font-bold text-center text-2xl text-light-neutral-900"
        >

          Please enter your email

        </h1>

        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={ formData.email }
          onChange={ handleInputChange }
          error={ message?.includes('your email!') ? message : error }
        />

        <Button
          loading={ loading }
          text="Change password"
          disabled={ isFormValid }
        />

      </form>

    </div>
  );
}

export default ModalChangePassword;
