/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { UserType } from '../../types';
import ActionButton from '../ActionButton';
import iconChevronDown from '../../../public/iconChevronDown.svg';

type TableRowUsersProps = {
  user: UserType
};

function TableRowUsers({ user }: TableRowUsersProps) {
  return (
    <tbody className="text-dark-neutral-500 border-t-2">
      <tr>
        <td>
          <div className="flex items-center justify-center py-spacing-little-12 sm:table-cell sm:pl-spacing-regular-20">
            <img
              className="rounded-full w-8 h-8 border"
              src={ user.photo }
              alt="employee avatar"
            />
          </div>
        </td>
        <td>{user.fullName}</td>
        <td className="hidden sm:table-cell">{user.username}</td>
        <td className="hidden md:table-cell">{user.email}</td>
        <td className="hidden lg:table-cell">{user.role}</td>
        <td className="hidden xl:table-cell">
          <div>
            <ActionButton
              label="edit"
            />
            <ActionButton
              label="delete"
            />
          </div>
        </td>
        <td className="xl:hidden">
          <div className="flex justify-center items-center cursor-pointer">
            <Image className="size-8" src={ iconChevronDown } alt="button to hide or show row details" />
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default TableRowUsers;
