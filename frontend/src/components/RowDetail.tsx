/* eslint-disable max-len */
import useWindowWidth from '../hooks/useWindowWidth';
import getColSpan from '../utils/handleColSpan';
import ButtonSort from './buttons/ButtonSort';

type RowDetailProps = {
  employeeData: string,
  header: string,
  breakpoint: string,
  showDetails: string
  handleSort: () => void
};

function RowDetail({ employeeData, header, breakpoint, showDetails, handleSort }:RowDetailProps) {
  const windowWidth = useWindowWidth();

  return (

    <tr className={ `${showDetails} text-black-neutral` }>

      <td
        className={ `px-spacing-regular-20 py-spacing-little-04 ${breakpoint}` }
        colSpan={ getColSpan(windowWidth) }
      >
        <div className="flex justify-between border-b border-dashed border-b-gray-neutral-10">

          <h2 className="text-h2 text-black-neutral">

            {header}

            <ButtonSort
              onClick={ handleSort }
              ariaLabel={ `Sort column ${header}` }
              id={ header }
            />

          </h2>

          <h3 className="text-h3 text-black-neutral pr-spacing-little-12">

            {employeeData}

          </h3>

        </div>

      </td>

    </tr>

  );
}

export default RowDetail;
