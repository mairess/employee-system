/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
import Image from 'next/image';
import errorIcon from '../../public/errorInputField.svg';
import successIcon from '../../public/successInputField.svg';

type ErrorInputFieldProps = {
  error: string
};

function ErrorInputField({ error }:ErrorInputFieldProps) {
  const isError = error !== 'Password reset link sent to your email!';

  return (
    isError ? (
      <p className="text-error text-xs mt-2 flex items-center">
        <Image
          className="mr-1"
          src={ errorIcon }
          alt="error"
          width={ 18 }
        />
        {error}
      </p>
    ) : (
      <p className="text-success text-xs mt-2 flex items-center">
        <Image
          className="mr-1"
          src={ successIcon }
          alt="success"
          width={ 18 }
        />
        {error}
      </p>
    )
  );
}

export default ErrorInputField;
