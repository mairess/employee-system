/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/table-user/Table';
import useToken from '../../hooks/useToken';
import AccessDenied from '../access-denied/page';

function DashboardUsers() {
  const token = useToken();

  return token ? (
    <div className="bg-white pb-4 min-h-screen">
      <Header />
      <div className="px-spacing-regular-20">

        <SearchBar
          title="Users"
          placeholder="Search User"
        />

        <Table />

      </div>
    </div>
  ) : <AccessDenied />;
}

export default DashboardUsers;
