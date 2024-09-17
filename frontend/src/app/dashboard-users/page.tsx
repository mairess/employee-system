/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import TableUsers from '../../components/TableUsers';

function DashboardUsers() {
  return (
    <div className="bg-white pb-4 min-h-screen">
      <Header />
      <div className="px-spacing-regular-20">

        <SearchBar
          title="Users"
          placeholder="Search User"
        />

        <TableUsers />

      </div>
    </div>
  );
}

export default DashboardUsers;
