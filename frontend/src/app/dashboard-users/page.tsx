/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import { useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/table-user/Table';
import useAuth from '../../hooks/useAuth';
import PaginationHeader from '../../components/table-user/PaginationHeader';
import ModalCreateUser from '../../components/modal/ModalCreateUSer';
import { RootState } from '../../store';
import ModalEditUser from '../../components/modal/ModalEditUser';

function DashboardUsers() {
  const { isModalCreateUserOpen } = useSelector((state: RootState) => state.modalCreateUser);
  const { isModalEditUserOpen } = useSelector((state: RootState) => state.modalEditUser);
  const selectedUser = useSelector((state: RootState) => state.editUser.selectedUser);
  const isAuthenticated = useAuth();

  if (isAuthenticated === null || !isAuthenticated) return null;

  return (
    <div className="px-spacing-regular-20 mb-1">

      {isModalCreateUserOpen && <ModalCreateUser />}

      {isModalEditUserOpen && selectedUser && <ModalEditUser user={ selectedUser } />}

      <SearchBar title="Users" placeholder="Search User" />

      <PaginationHeader />

      <div className="h-[75vh] overflow-y-auto custom-scrollbar">

        <Table />

      </div>

    </div>
  );
}

export default DashboardUsers;
