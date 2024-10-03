/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */

import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';
import Input from '../Input';
import { AppDispatch, RootState } from '../../store';
import { clearError, resetEmployee } from '../../store/createEmployeeSlice';
import createEmployee from '../../services/createEmployee';
import Button from '../buttons/Button';
import { closeModalCreateEmployee } from '../../store/modalCreateEmployeeSlice';
import useToken from '../../hooks/useToken';

function ModalCreateEmployee() {
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();
  const token = useToken();
  const { isModalCreateEmployeeOpen } = useSelector((state: RootState) => state.modalCreateEmployee);
  const { loading, employee, error } = useSelector((state: RootState) => state.createEmployee);
  const [formData, setFormData] = useState({ photo: '', fullName: '', position: '', admission: '', phone: '' });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeModalCreateEmployee());
        setFormData({ photo: '', fullName: '', position: '', admission: '', phone: '' });
        dispatch(clearError());
      }
    };

    if (isModalCreateEmployeeOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalCreateEmployeeOpen, dispatch, pathName]);

  useEffect(() => {
    if (employee.id) {
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
        title: 'Employee created successfully',
      }).then(() => {
        dispatch(closeModalCreateEmployee());
        dispatch(resetEmployee());
      });
    }
  }, [dispatch, employee.id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createEmployee({ employeeData: formData, token }));

    if (employee.id) {
      dispatch(closeModalCreateEmployee());
    }
  };

  const handleCloseModal = () => {
    setFormData({ photo: '', fullName: '', position: '', admission: '', phone: '' });
    dispatch(closeModalCreateEmployee());
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
          Add new employee
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
          type="position"
          name="position"
          id="position"
          placeholder="Position"
          value={ formData.position }
          error={ error }
          onChange={ handleInputChange }
        />

        <Input
          type="admission"
          name="admission"
          id="admission"
          placeholder="Admission"
          value={ formData.admission }
          error={ error }
          onChange={ handleInputChange }
        />

        <Input
          type="phone"
          name="phone"
          id="phone"
          placeholder="Phone"
          value={ formData.phone }
          error={ error }
          onChange={ handleInputChange }
        />

        <Button
          loading={ loading }
          text="Create employee"
        />

      </form>

    </div>
  );
}

export default ModalCreateEmployee;
