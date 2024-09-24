/* eslint-disable max-len */

'use client';

import Loading from '../Loading';

type ButtonProps = {
  text: string
  loading: boolean,
  disabled?: boolean
};

function Button({ text, loading, disabled = false }:ButtonProps) {
  return (
    <button
      className="rounded-xl px-3 py-2 bg-light-neutral-500 font-bold hover:bg-dark-neutral-600 text-white"
      disabled={ disabled }
    >
      { loading ? <Loading /> : text }
    </button>
  );
}

export default Button;
