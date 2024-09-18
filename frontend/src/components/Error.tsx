/* eslint-disable react/jsx-max-depth */
import Image from 'next/image';
import iconErro from '../../public/iconError.svg';
import useWindowWidth from '../hooks/useWindowWidth';
import getColSpan from '../utils/handleColSpan';

function Error() {
  const windowWidth = useWindowWidth();
  return (
    <tbody>
      <tr>
        <td colSpan={ getColSpan(windowWidth) } className="p-10">
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
