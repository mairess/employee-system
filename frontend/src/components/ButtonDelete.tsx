import Image from 'next/image';
import iconDelete from '../../public/iconDelete.svg';

function ButtonDelete() {
  return (
    <button className="hover:bg-light-neutral-200 p-1 rounded">
      <Image src={ iconDelete } alt="delete" width={ 24 } />
    </button>
  );
}

export default ButtonDelete;
