/* eslint-disable max-len */

'use client';

import { UserType } from '../types';
import ActionButton from './ActionButton';

type TableRowUsersProps = {
  user: UserType
};

function TableRowUsers({ user }: TableRowUsersProps) {
  return (
    <tbody className="text-dark-neutral-500 border-t-2">
      <tr>
        <td className="pl-spacing-regular-20 py-spacing-little-12 flex items-center gap-2">
          <img
            className="rounded-full w-8 h-8 border"
            src={ user.photo }
            alt="employee avatar"
          />
          {user.fullName}
        </td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <div>
            <ActionButton
              label="edit"
            />
            <ActionButton
              label="delete"
            />
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default TableRowUsers;
