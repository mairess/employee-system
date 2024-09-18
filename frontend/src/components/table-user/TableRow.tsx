/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { UserType } from '../../types';
import ActionButton from '../ActionButton';
import iconChevronDown from '../../../public/iconChevronDown.svg';
import iconChevronUp from '../../../public/iconChevronUp.svg';
import useWindowWidth from '../../hooks/useWindowWidth';
import RowDetail from '../RowDetail';
import getColSpan from '../../utils/handleColSpan';

type TableRowUsersProps = {
  user: UserType
};

function TableRowUsers({ user }: TableRowUsersProps) {
  const [showDetails, setShowDetails] = useState(false);
  const windowWidth = useWindowWidth();

  const handleDetail = () => {
    setShowDetails(!showDetails);
  };

  return (
    <tbody className="text-dark-neutral-500 border-t">
      <tr className="text-black-neutral text-h3">
        <td>
          <td className="sm:table-cell sm:pl-spacing-regular-20">
            <img
              className="rounded-full w-8 h-8 border"
              src={ user.photo }
              alt="employee avatar"
            />
          </td>
        </td>
        <td>{user.fullName}</td>
        <td className="hidden sm:table-cell">{user.username}</td>
        <td className="hidden md:table-cell">{user.email}</td>
        <td className="hidden lg:table-cell">{user.role}</td>
        <td className="hidden xl:table-cell">
          <div>
            <ActionButton label="edit" />
            <ActionButton label="delete" />
          </div>
        </td>
        <td className="xl:hidden p-spacing-little-12">
          <div className="flex justify-end items-center cursor-pointer">
            <button
              onClick={ handleDetail }
            >
              <Image className="size-8" src={ showDetails ? iconChevronUp : iconChevronDown } alt="button to hide or show row details" />
            </button>
          </div>
        </td>
      </tr>

      {
        showDetails && (
          <>
            <RowDetail
              breakpoint="lg:hidden"
              head="Role"
              employeeData={ user.role }
            />
            <RowDetail
              breakpoint="md:hidden"
              head="Email"
              employeeData={ user.email }
            />
            <RowDetail
              breakpoint="sm:hidden"
              head="Username"
              employeeData={ user.username }
            />

            <tr className="xl:hidden">
              <td
                className="px-spacing-regular-20"
                colSpan={ getColSpan(windowWidth) }
              >
                <div className="flex w-full justify-end lg:border-t lg:border-dashed lg:border-t-gray-neutral-10">
                  <ActionButton label="edit" />
                  <ActionButton label="delete" />
                </div>
              </td>
            </tr>
          </>
        )
      }

    </tbody>
  );
}

export default TableRowUsers;
