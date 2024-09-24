import Image from 'next/image';
import iconEdit from '../../../public/iconEdit.svg';

function ButtonEdit() {
  return (
    <button className="hover:bg-light-neutral-200 p-1 rounded">
      <Image src={ iconEdit } alt="edit" width={ 24 } />
    </button>
  );
}

export default ButtonEdit;
