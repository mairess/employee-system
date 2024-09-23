import { FaSort } from 'react-icons/fa';

type ButtonSortProps = {
  onClick: () => void
  ariaLabel: string
};

function ButtonSort({ onClick, ariaLabel }: ButtonSortProps) {
  return (
    <button
      onClick={ onClick }
      aria-label={ ariaLabel }
    >

      <FaSort className="pt-1 hover:text-dark-neutral-0" />

    </button>
  );
}

export default ButtonSort;
