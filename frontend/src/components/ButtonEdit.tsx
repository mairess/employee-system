import Image from 'next/image';
import iconEdit from '../../public/iconEdit.svg';

function ButtonEdit() {
  return (
    <button>
      <Image src={ iconEdit } alt="edit" width={ 24 } />
    </button>
  );
}

export default ButtonEdit;
