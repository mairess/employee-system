/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import { useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/table-employees/Table';
import useAuth from '../../hooks/useAuth';
import PaginationHeader from '../../components/table-employees/PaginationHeader';
import ModalCreateEmployee from '../../components/ModalCreateEmployee';
import { RootState } from '../../store';
import ModalEditEmployee from '../../components/ModalEditEmployee';

function DashboardEmployees() {
  const { isModalOpen } = useSelector((state: RootState) => state.modal);
  const selectedEmployee = useSelector((state: RootState) => state.editEmployee.selectedEmployee);
  const isAuthenticated = useAuth();

  if (isAuthenticated === null || !isAuthenticated) return null;

  return (

    <div className="bg-white px-spacing-regular-20 mb-1">

      {isModalOpen && <ModalCreateEmployee />}

      {isModalOpen && selectedEmployee && <ModalEditEmployee employee={ selectedEmployee } />}

      <SearchBar title="Employees" placeholder="Search Employee" />

      <PaginationHeader />

      <div className="h-[75vh] overflow-y-auto custom-scrollbar">

        <Table />

      </div>

    </div>

  );
}

export default DashboardEmployees;
