type ErrorInputFieldProps = {
  errors: string | string[] | null
};

function ErrorInputField({ errors }:ErrorInputFieldProps) {
  return (
    <p className="text-error text-xs mt-2">
      {errors}
    </p>
  );
}

export default ErrorInputField;
