/* eslint-disable max-len */

'use client';

type InputProps = {
  type: string,
  name: string,
  id: string,
  placeholder: string,
  value: string,
  error?: { message: string } | null,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function Input({ type, name, id, placeholder, value, error = null, onChange }: InputProps) {
  return (
    <div>
      <input
        className="rounded-xl px-3 py-2 text-black border border-light-neutral-400 bg-light-neutral-0 hover:border-dark-neutral-300"
        type={ type }
        name={ name }
        id={ id }
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange }
      />
      {error
      && <p className="text-error text-sm mt-2">{error?.message}</p>}
    </div>
  );
}

export default Input;
