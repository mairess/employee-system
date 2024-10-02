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
import { clearError, resetUser } from '../../store/editUserSlice';
import Button from '../buttons/Button';
import { closeModalEditUser } from '../../store/modalEditUserSlice';
import editUser from '../../services/editUser';
import useToken from '../../hooks/useToken';
import findAllUsers from '../../services/findAllUsers';
import { UserType } from '../../types';

type ModalEditUserProps = {
  user: UserType
};

function ModalEditUser({ user }: ModalEditUserProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalEditUserOpen } = useSelector((state: RootState) => state.modalEditUser);
  const { loading, error } = useSelector((state: RootState) => state.editUser);
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);
  const { column, direction } = useSelector((state: RootState) => state.sort);
  const [formData, setFormData] = useState({ photo: '', fullName: '', username: '', email: '', role: '' });
  const { term } = useSelector((state: RootState) => state.searchTerm);
  const token = useToken();

  const { id, photo, fullName, username, email, role } = user;

  const idString = id?.toString() || '';

  useEffect(() => {
    if (user) {
      setFormData({
        photo,
        fullName,
        username,
        email,
        role,
      });
    }
  }, [user, id, photo, fullName, username, email, role]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeModalEditUser());
        setFormData({ photo: '', fullName: '', username: '', email: '', role: '' });
        dispatch(clearError());
      }
    };

    if (isModalEditUserOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalEditUserOpen, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(editUser({ token, id: idString, userData: formData }));

    if (editUser.fulfilled.match(resultAction)) {
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
        title: 'User edited successfully',
      }).then(() => {
        dispatch(closeModalEditUser());
        dispatch(resetUser());
        if (token) { dispatch(findAllUsers({ token, pageNumber, pageSize, column, direction, term })); }
      });
    }
  };

  const handleCloseModal = () => {
    setFormData({ photo: '', fullName: '', username: '', email: '', role: '' });
    dispatch(closeModalEditUser());
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
          Edit user
        </h1>

        <Input
          type="text"
          name="photo"
          id="URL"
          placeholder="https://robohash.org/me.png"
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

        <Button
          loading={ loading }
          text="Edit user"
        />

      </form>

    </div>
  );
}

export default ModalEditUser;
