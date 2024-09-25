/* eslint-disable react/jsx-max-depth */
import Image from 'next/image';
import noDataFound from '../../public/noDataFound.svg';
import useWindowWidth from '../hooks/useWindowWidth';
import getColSpan from '../utils/handleColSpan';

function NoDataFound() {
  const windowWidth = useWindowWidth();

  return (

    <tbody>

      <tr>
        <td colSpan={ getColSpan(windowWidth) } className="p-10 ">

          <div className="flex justify-center">

            <Image src={ noDataFound } alt="error" />

          </div>

          <p className="text-dark-neutral-0 text-center">
            No data was found
          </p>

        </td>

      </tr>

    </tbody>

  );
}

export default NoDataFound;
