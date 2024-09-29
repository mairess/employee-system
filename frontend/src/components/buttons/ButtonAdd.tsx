/* eslint-disable max-len */
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import add from '../../../public/add.svg';
import { openModal } from '../../store/modalPasswordChangeSlice';
import { AppDispatch } from '../../store';

function ButtonAdd() {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(openModal());
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
