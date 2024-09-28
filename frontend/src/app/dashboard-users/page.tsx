/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import { useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/table-user/Table';
import useAuth from '../../hooks/useAuth';
import PaginationHeader from '../../components/table-user/PaginationHeader';
import ModalCreateUser from '../../components/ModalCreateUSer';
import { RootState } from '../../store';

function DashboardUsers() {
  const { isModalOpen } = useSelector((state: RootState) => state.modalPasswordChange);
  const isAuthenticated = useAuth();

  if (isAuthenticated === null || !isAuthenticated) return null;

  return (
    <div className="bg-white px-spacing-regular-20 mb-1">

      {isModalOpen && <ModalCreateUser />}

      <SearchBar title="Users" placeholder="Search User" />

      <PaginationHeader />

      <div className="h-[75vh] overflow-y-auto custom-scrollbar">

        <Table />

      </div>

    </div>
  );
}

export default DashboardUsers;
