/* eslint-disable react/jsx-max-depth */
import Image from 'next/image';
import { useSelector } from 'react-redux';
import noDataFound from '../../public/noDataFound.svg';
import useWindowWidth from '../hooks/useWindowWidth';
import getColSpan from '../utils/handleColSpan';
import { RootState } from '../store';

type NoDataFoundProps = {
  title: string
};

function NoDataFound({ title }: NoDataFoundProps) {
  const windowWidth = useWindowWidth();
  const { user } = useSelector((state: RootState) => state.findLoggedUser);

  const isAdmin = user?.role === 'ADMIN';

  return (

    <tbody>

      <tr>
        <td colSpan={ getColSpan(windowWidth, isAdmin) } className="p-10 ">

          <div className="flex justify-center">

            <Image src={ noDataFound } width={ 300 } alt="error" />

          </div>

          <p className="text-dark-neutral-0 text-center">
            No
            {' '}
            {title}
            {' '}
            was found...
          </p>

        </td>

      </tr>

    </tbody>

  );
}

export default NoDataFound;
