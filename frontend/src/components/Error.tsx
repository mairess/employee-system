/* eslint-disable react/jsx-max-depth */
import Image from 'next/image';
import { useSelector } from 'react-redux';
import iconErro from '../../public/iconError.svg';
import useWindowWidth from '../hooks/useWindowWidth';
import getColSpan from '../utils/handleColSpan';
import { RootState } from '../store';

function Error() {
  const windowWidth = useWindowWidth();
  const { user } = useSelector((state: RootState) => state.findLoggedUser);

  const isAdmin = user?.role === 'ADMIN';

  return (
    <tbody>
      <tr>
        <td colSpan={ getColSpan(windowWidth, isAdmin) } className="p-10">
          <div className="flex justify-center">
            <Image className="size-8" src={ iconErro } alt="error" />
          </div>
          <p className="text-dark-neutral-0 text-center">
            Error loading data...
          </p>
        </td>
      </tr>
    </tbody>
  );
}

export default Error;
