/* eslint-disable max-len */

'use client';

type ButtonProps = {
  text: string
};

function Button({ text }:ButtonProps) {
  return (
    <button className="rounded-xl px-3 py-2 bg-light-neutral-500 font-bold hover:bg-dark-neutral-600">
      {text}
    </button>
  );
}

export default Button;
