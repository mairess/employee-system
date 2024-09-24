/* eslint-disable max-len */
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type ButtonSortProps = {
  onClick: () => void,
  ariaLabel: string,
  id: string,
};

function ButtonSort({ onClick, ariaLabel, id }: ButtonSortProps) {
  const { direction, column } = useSelector((state: RootState) => state.sort);

  const idLowerCase = id.toLocaleLowerCase();
  const colLowerCase = column.toLocaleLowerCase();

  return (
    <button
      className={ colLowerCase === idLowerCase ? 'text-light-neutral-500' : '' }
      onClick={ onClick }
      aria-label={ ariaLabel }
    >

      {colLowerCase === idLowerCase && direction === 'asc' ? '▼' : '▲'}

    </button>
  );
}

export default ButtonSort;
