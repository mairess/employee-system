/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
import Image from 'next/image';
import errorIcon from '../../public/errorInputField.svg';
import successIcon from '../../public/successInputField.svg';

type ErrorInputFieldProps = {
  errors: string
};

function ErrorInputField({ errors }:ErrorInputFieldProps) {
  const isError = errors !== 'Password reset link sent to your email!';

  // commented this code because text color is not working I don not why
  return (
  // <p className={ `text-${isError ? 'error' : 'success'} text-sm mt-2 flex items-center` }>
  //   <Image
  //     className="mr-1"
  //     src={ isError ? errorIcon : successIcon }
  //     alt="error"
  //     width={ 16 }
  //   />
  //   {errors}
  // </p>

    isError
      ? <p className="text-error text-sm mt-2 flex items-center">
        <Image
          className="mr-1"
          src={ isError ? errorIcon : successIcon }
          alt="error"
          width={ 16 }
        />
        {errors}
      </p>
      : <p className="text-success text-sm mt-2 flex items-center">
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
