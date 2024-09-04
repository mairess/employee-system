/* eslint-disable max-len */

'use client';

type InputProps = {
  type: string,
  name: string,
  id: string,
  placeholder: string,
};

function Input({ type, name, id, placeholder }: InputProps) {
  return (
    <input
      className="rounded-xl px-3 py-2 text-black border border-light-neutral-400 bg-light-neutral-0 hover:border-dark-neutral-300"
      type={ type }
      name={ name }
      id={ id }
      placeholder={ placeholder }
    />
  );
}

export default Input;
