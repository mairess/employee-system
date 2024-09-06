'user client';

function Divider() {
  return (
    <div className="flex justify-center items-center">
      {' '}
      <div className="border-t border-light-neutral-400 flex-grow mr-3" />
      <span className="text-light-neutral-400 text-sm">OR</span>
      <div className="border-t border-light-neutral-400 flex-grow ml-3" />
    </div>
  );
}

export default Divider;
