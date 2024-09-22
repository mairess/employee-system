/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import SearchBar from '../../components/SearchBar';
import Table from '../../components/table-employees/Table';
import useAuth from '../../hooks/useAuth';
import PaginationHeader from '../../components/table-employees/PaginationHeader';

function DashboardEmployees() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null || !isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-white px-spacing-regular-20 mb-1">

      <SearchBar title="Employees" placeholder="Search Employee" />

      <PaginationHeader />

      <div className="h-[75vh] overflow-y-auto custom-scrollbar">

        <Table />

      </div>

    </div>
  );
}

export default DashboardEmployees;
