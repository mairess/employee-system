/* eslint-disable max-len */
import Image from 'next/image';
import errorIcon from '../../public/errorInputField.svg';
import successIcon from '../../public/successInputField.svg';

type ErrorInputFieldProps = {
  errors: string | string[] | null
};

function ErrorInputField({ errors }:ErrorInputFieldProps) {
  const isError = errors !== 'Password reset link sent to your email!';

  return (
    <p className={ `text-${isError ? 'error' : 'success'} text-sm mt-2 flex items-center` }>
      <Image
        className="mr-1"
        src={ isError ? errorIcon : successIcon }
        alt="error"
        width={ 16 }
      />
      {errors}
    </p>

  );
}

export default ErrorInputField;
