/* eslint-disable complexity */
/* eslint-disable max-len */

'use client';

import ErrorInputField from './ErrorInputField';

type InputProps = {
  type: string,
  name: string,
  id: string,
  placeholder: string,
  value: string,
  error?: string | string[] | null
  autocomplete?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function Input({ type, name, id, placeholder, value, error = '', autocomplete = '', onChange }: InputProps) {
  const handleErrors = (errorData: string | string[] | null, identifier: string) => {
    if (Array.isArray(errorData)) {
      const filteredErrors = errorData
        .filter((err) => (err.toLocaleLowerCase().includes(identifier.toLocaleLowerCase()) || err.toLowerCase().includes(placeholder.toLowerCase())));

      return (<div className="flex flex-col">{filteredErrors.map((err, index) => (<ErrorInputField key={ index } errors={ err } />))}</div>);
    }

    return (<div><ErrorInputField errors={ errorData } /></div>);
  };

  return (
    <div>
      <input
        className="rounded-xl px-3 py-2 text-black border border-light-neutral-400 bg-light-neutral-0 hover:border-dark-neutral-300"
        type={ type }
        name={ name }
        id={ id }
        placeholder={ placeholder }
        value={ value }
        autoComplete={ autocomplete }
        onChange={ onChange }
      />
      {(error && typeof error === 'string' && (error.includes(placeholder.toLocaleLowerCase()))) && handleErrors(error, id)}
      {(error && typeof error !== 'string' && handleErrors(error, id))}
      {(error && typeof error === 'string' && (error.includes('credentials') || error.includes('Password do not match!')) && handleErrors(error, id))}
    </div>
  );
}

export default Input;
