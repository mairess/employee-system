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

    <p className={ `text-${isError ? 'error' : 'success'} text-xs mt-2 flex items-center` }>

      <Image
        className="mr-1"
        src={ isError ? errorIcon : successIcon }
        alt="error"
        width={ 18 }
      />

      {error}

    </p>

  );
}

export default ErrorInputField;
