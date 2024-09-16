function TableFooter() {
  return (
    <tfoot className="bg-gradient-primary">
      <tr>
        <td
          className="p-spacing-little-12 rounded-bl-lg rounded-br-lg"
          colSpan={ 5 }
        >
          <div>
            footer here
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

export default TableFooter;
