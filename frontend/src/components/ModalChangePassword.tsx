/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Input from './Input';
import Button from './Button';
import usePasswordChange from '../hooks/usePasswordChange';

type ModalProps = {
  onClose: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
  isModalOpen: boolean,
};

function ModalChangePassword({ onClose, isModalOpen }: ModalProps) {
  const [formData, setFormData] = useState({ email: '' });
  const { setError, error, loading, fetchData, setConfirmation, confirmation } = usePasswordChange({ ...formData });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(event as any);
        setFormData({ email: '' });
        setError(null);
        setConfirmation(null);
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  if (!isModalOpen) return null;

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    onClose(event);
    setFormData({ email: '' });
    setError(null);
    setConfirmation(null);
  };

  const handleClickInside = (event: React.MouseEvent<HTMLFormElement>) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetchData();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={ handleClickOutside }
    >

      <form
        className="relative flex flex-col items-center py-14 px-6 bg-light-neutral-100 gap-4 rounded-lg"
        onSubmit={ handleSubmit }
        onClick={ handleClickInside }
      >

        <button
          className="absolute top-2 right-2 text-light-neutral-500 hover:text-light-neutral-700"
          onClick={ (event) => {
            event.preventDefault();
            onClose(event);
            setFormData({ email: '' });
            setError(null);
            setConfirmation(null);
          } }
          aria-label="Fechar modal"
        >

          <FaTimes size={ 24 } />

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
          error={ confirmation?.message.includes('your email!') ? confirmation : error }
        />

        <Button
          loading={ loading }
          text="Change password"
        />

      </form>

    </div>
  );
}

export default ModalChangePassword;
