/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';
import PaginationFooter from './PaginationFooter';
import { RootState } from '../../store';

function TableFooter() {
  const windowWidth = useWindowWidth();
  const { user } = useSelector((state: RootState) => state.findLoggedUser);

  const isAdmin = user?.role === 'ADMIN';

  return (
    <tfoot className="bg-gradient-primary text-white sticky bottom-0">

      <tr>

        <td colSpan={ getColSpan(windowWidth, isAdmin) } className="rounded-b-lg">
          <PaginationFooter />
        </td>

      </tr>

    </tfoot>
  );
}

export default TableFooter;
