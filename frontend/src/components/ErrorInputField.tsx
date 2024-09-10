type ErrorInputFieldProps = {
  errors: string | string[] | null
};

function ErrorInputField({ errors }:ErrorInputFieldProps) {
  return (
    errors === 'Password reset link sent to your email!'
      ? <p className="text-success text-xs mt-2">{errors}</p>
      : <p className="text-error text-xs mt-2">{errors}</p>

  );
}

export default ErrorInputField;
