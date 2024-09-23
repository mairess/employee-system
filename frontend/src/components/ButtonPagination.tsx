/* eslint-disable max-len */
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

type ButtonPaginationProps = {
  onClick: () => void,
  isDisabled: boolean,
  ariaLabel: string
};

function ButtonPagination({ onClick, isDisabled, ariaLabel }: ButtonPaginationProps) {
  return (
    <button
      className={ `p-1 rounded ${isDisabled ? 'cursor-default' : 'hover:bg-hover-primary-transparent cursor-pointer'}` }
      onClick={ onClick }
      disabled={ isDisabled }
      aria-label={ ariaLabel }
    >

      {
        ariaLabel.includes('next')
          ? <FaChevronRight className={ isDisabled ? 'text-gray-400' : 'text-white' } />
          : <FaChevronLeft className={ isDisabled ? 'text-gray-400' : 'text-white' } />
      }

    </button>

  );
}

export default ButtonPagination;
