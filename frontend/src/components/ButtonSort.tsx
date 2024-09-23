/* eslint-disable max-len */
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type ButtonSortProps = {
  onClick: () => void,
  ariaLabel: string,
  id: string,
  activeButton: string | null,
  setActiveButton: (value: string) => void,
};

function ButtonSort({ onClick, ariaLabel, id, activeButton, setActiveButton }: ButtonSortProps) {
  const { direction } = useSelector((state: RootState) => state.sort);

  const handleClick = () => {
    setActiveButton(id);
    onClick();
  };

  return (
    <button
      className={ activeButton === id && activeButton ? 'text-dark-neutral-0' : 'light-neutral-0' }
      onClick={ handleClick }
      aria-label={ ariaLabel }
    >

      {activeButton === id && direction === 'asc' ? '▼' : '▲'}

    </button>
  );
}

export default ButtonSort;
