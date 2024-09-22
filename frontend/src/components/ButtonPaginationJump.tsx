/* eslint-disable max-len */
import { FaAnglesRight, FaAnglesLeft } from 'react-icons/fa6';

type ButtonPaginationProps = {
  onClick: () => void,
  isDisabled: boolean,
  ariaLabel: string
};

function ButtonPaginationJump({ onClick, isDisabled, ariaLabel }: ButtonPaginationProps) {
  return (
    <button
      className={ `flex p-1 rounded ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-hover-primary-transparent cursor-pointer'}` }
      onClick={ onClick }
      disabled={ isDisabled }
      aria-label={ ariaLabel }
    >

      {
        ariaLabel.includes('next')
          ? <FaAnglesRight className={ isDisabled ? 'text-gray-400' : 'text-white' } />
          : <FaAnglesLeft className={ isDisabled ? 'text-gray-400' : 'text-white' } />
      }

    </button>

  );
}

export default ButtonPaginationJump;
