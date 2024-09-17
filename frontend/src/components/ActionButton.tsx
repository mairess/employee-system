/* eslint-disable max-len */

'use client';

type ActionButtonProps = {
  label?: 'edit' | 'delete',
};

function ActionButton({ label = 'edit' }: ActionButtonProps) {
  return (
    <button className={ label === 'edit' ? 'bg-success rounded-xl px-2 py-1 m-1 text-white hover:bg-hover-success' : 'bg-error rounded-xl px-2 py-1 m-1 text-white hover:bg-hover-error' }>
      {label}
    </button>
  );
}

export default ActionButton;
