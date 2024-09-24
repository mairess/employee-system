import useWindowWidth from '../hooks/useWindowWidth';
import getColSpan from '../utils/handleColSpan';

/* eslint-disable max-len */
type RowDetailProps = {
  employeeData: string,
  head: string,
  breakpoint: string,
};

function RowDetail({ employeeData, head, breakpoint }:RowDetailProps) {
  const windowWidth = useWindowWidth();

  return (
    <tr className="text-black-neutral">

      <td
        className={ `px-spacing-regular-20 py-spacing-little-04 ${breakpoint}` }
        colSpan={ getColSpan(windowWidth) }
      >
        <div className="flex justify-between border-b border-dashed border-b-gray-neutral-10">
          <h2 className="text-h2 text-black-neutral">{head}</h2>
          <h3 className="text-h3 text-black-neutral pr-spacing-little-12">{employeeData}</h3>
        </div>
      </td>

    </tr>
  );
}

export default RowDetail;
