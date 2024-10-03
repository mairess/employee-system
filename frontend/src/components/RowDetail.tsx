/* eslint-disable max-len */
import useWindowWidth from '../hooks/useWindowWidth';
import getColSpan from '../utils/handleColSpan';
import ButtonSort from './buttons/ButtonSort';

type RowDetailProps = {
  employeeData: string,
  header: string,
  breakpoint: string,
  showDetails: string,
  handleSort: () => void,
  index: number
};

function RowDetail({ employeeData, header, breakpoint, showDetails, handleSort, index }:RowDetailProps) {
  const windowWidth = useWindowWidth();
  const isOdd = index % 2 === 0;

  return (

    <tr className={ `${showDetails} text-black-neutral ${isOdd ? 'bg-light-neutral-0' : 'bg-gray-neutral-10'}` }>

      <td
        className={ `px-spacing-regular-20 py-spacing-little-04 ${breakpoint}` }
        colSpan={ getColSpan(windowWidth) }
      >
        <div className="flex justify-between border-b border-dashed border-b-dark-neutral-800">

          <h2 className="text-h2 text-black-neutral">

            {header}

            <ButtonSort
              onClick={ handleSort }
              ariaLabel={ `Sort column ${header}` }
              id={ header }
            />

          </h2>

          <h3 className="text-h3 text-black-neutral">

            {employeeData}

          </h3>

        </div>

      </td>

    </tr>

  );
}

export default RowDetail;
