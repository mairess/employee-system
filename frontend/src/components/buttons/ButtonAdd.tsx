/* eslint-disable max-len */
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import add from '../../../public/add.svg';
import { openModalCreateEmployee } from '../../store/modalCreateEmployeeSlice';
import { openModalCreateUser } from '../../store/modalCreateUserSlice';
import { AppDispatch } from '../../store';

function ButtonAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const openModal = pathName === '/dashboard-employees' ? openModalCreateEmployee() : openModalCreateUser();
    dispatch(openModal);
  };

  return (
    <button
      className="bg-success hover:bg-hover-success text-light-neutral-0 shadow-custom-10 rounded-lg px-4 py-2 flex"
      onClick={ handleOpenModal }
    >

      <Image
        className="w-6 mr-2"
        src={ add }
        alt="add icon"
      />

      New
    </button>
  );
}

export default ButtonAdd;
