function TableFooter() {
  return (
    <tfoot className="bg-gradient-primary text-white sticky bottom-0">
      <tr>
        <td
          className="p-spacing-little-12 rounded-bl-lg"
        >
          <div>
            footer here
          </div>
        </td>
        <td className="hidden" />
        <td className="hidden sm:table-cell" />
        <td className="hidden md:table-cell" />
        <td className="hidden lg:table-cell" />
        <td />
        <td className="rounded-br-lg" />
      </tr>
    </tfoot>
  );
}

export default TableFooter;
