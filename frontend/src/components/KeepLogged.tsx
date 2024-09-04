/* eslint-disable max-len */

'use client';

function KeepLogged() {
  return (
    <div className="flex items-center justify-center">
      <label className="text-sm text-dark-neutral-600 text-center" htmlFor="keep-logged">Keep me logged</label>
      <input
        className="ml-2 hover:border-dark-neutral-300"
        type="checkbox"
        id="keep-logged"
      />
    </div>
  );
}

export default KeepLogged;
