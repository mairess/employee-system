/* eslint-disable react/jsx-max-depth */
import Image from 'next/image';
import iconErro from '../../public/iconError.svg';

function Error() {
  return (
    <tbody>
      <tr>
        <td colSpan={ 5 } className="p-10">
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
