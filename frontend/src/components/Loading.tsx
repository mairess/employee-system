/* eslint-disable max-len */
function Loading() {
  return (
    <tbody>
      <tr>
        <td colSpan={ 5 }>
          <div className="flex flex-col justify-center items-center">
            <div className="border-4 border-light-neutral-400 border-t-light-neutral-700 border-r-light-neutral-700 rounded-full size-6 animate-spin" />
            <p className="text-black-neutral">Loading data...</p>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default Loading;
