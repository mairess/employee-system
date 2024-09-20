import Image from 'next/image';
import iconDelete from '../../public/iconDelete.svg';

function ButtonDelete() {
  return (
    <button>
      <Image src={ iconDelete } alt="edit" width={ 24 } />
    </button>
  );
}

export default ButtonDelete;
