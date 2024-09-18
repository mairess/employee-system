/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/table-employees/Table';
import useToken from '../../hooks/useToken';
import AccessDenied from '../access-denied/page';

function DashboardEmployees() {
  const token = useToken();
  return token ? (
    <div className="bg-white pb-4 min-h-screen">
      <Header />
      <div className="px-spacing-regular-20">

        <SearchBar
          title="Employees"
          placeholder="Search Employee"
        />

        <Table />

      </div>
    </div>
  ) : <AccessDenied />;
}

export default DashboardEmployees;
