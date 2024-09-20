/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { UserType } from '../../types';
import iconChevronDown from '../../../public/iconChevronDown.svg';
import iconChevronUp from '../../../public/iconChevronUp.svg';
import useWindowWidth from '../../hooks/useWindowWidth';
import RowDetail from '../RowDetail';
import getColSpan from '../../utils/handleColSpan';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

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
    <>
      <tr className="border-t">

        <td className="flex justify-center photo sm:flex sm:justify-start">
          <img className="rounded-full w-8 h-8 border" src={ user.photo } alt="employee avatar" />
        </td>

        <td className="text-center sm:text-left">{user.fullName}</td>

        <td className="hidden sm:table-cell">{user.username}</td>

        <td className="hidden md:table-cell">{user.email}</td>

        <td className="hidden lg:table-cell">{user.role}</td>

        <td className="hidden lg:flex justify-center actions gap-2">

          <ButtonEdit />
          <ButtonDelete />

        </td>

        <td className="text-center lg:hidden">

          <button
            onClick={ handleDetail }
          >
            <Image className="size-8" src={ showDetails ? iconChevronUp : iconChevronDown } alt="button to hide or show row details" />
          </button>

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

            <tr className="lg:hidden">

              <td className="px-spacing-regular-20" colSpan={ getColSpan(windowWidth) }>

                <div className="flex w-full justify-end gap-2">
                  <ButtonEdit />
                  <ButtonDelete />
                </div>

              </td>

            </tr>

          </>
        )
      }

    </>
  );
}

export default TableRowUsers;
