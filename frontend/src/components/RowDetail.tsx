import useWindowWidth from '../hooks/useWindowWidth';

/* eslint-disable max-len */
type RowDetailProps = {
  employeeData: string,
  head: string,
  breakpoint: string,
};

function RowDetail({ employeeData, head, breakpoint }:RowDetailProps) {
  const windowWidth = useWindowWidth();

  const getColSpan = () => {
    if (windowWidth >= 1024) return 6;
    if (windowWidth >= 768) return 5;
    if (windowWidth >= 640) return 4;
    return 3;
  };

  return (
    <tr className="text-black-neutral">

      <td
        className={ `px-spacing-regular-20 py-spacing-little-04 ${breakpoint}` }
        colSpan={ getColSpan() }
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
