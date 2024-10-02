import Image from 'next/image';
import iconEdit from '../../../public/iconEdit.svg';

type ButtonEditProps = {
  onClick?: () => void;
};

function ButtonEdit({ onClick = () => {} }: ButtonEditProps) {
  return (

    <button
      onClick={ onClick }
      className="hover:bg-light-neutral-200 p-1 rounded"
    >
      <Image src={ iconEdit } alt="edit" width={ 24 } />

    </button>

  );
}

export default ButtonEdit;
