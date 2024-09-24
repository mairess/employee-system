/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';
import PaginationFooter from './PaginationFooter';

function TableFooter() {
  const windowWidth = useWindowWidth();
  return (
    <tfoot className="bg-gradient-primary text-white sticky bottom-0">

      <tr>

        <td colSpan={ getColSpan(windowWidth) } className="rounded-b-lg">
          <PaginationFooter />
        </td>

      </tr>

    </tfoot>
  );
}

export default TableFooter;
