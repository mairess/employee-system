/* eslint-disable complexity */
/* eslint-disable max-len */

'use client';

import handleErrosInputFields from '../utils/handleErrosInputFields';

type InputProps = {
  type: string,
  name: string,
  id: string,
  placeholder: string,
  value: string,
  error?: string | string[] | null,
  autocomplete?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function Input({ type, name, id, placeholder, value, error = null, autocomplete = '', onChange }: InputProps) {
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
      {handleErrosInputFields(error, id, placeholder)}
    </div>
  );
}

export default Input;
