/* eslint-disable max-len */
import Image from 'next/image';
import add from '../../../public/add.svg';

function ButtonAdd() {
  return (
    <button
      className="bg-success hover:bg-hover-success text-light-neutral-0 shadow-custom-10 rounded-lg p-2 flex"
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
