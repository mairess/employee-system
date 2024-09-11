/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import useEmployees from '../../hooks/useEmployees';
import Table from '../../components/Table';

function Dashboard() {
  const { setError, error, loading, employees } = useEmployees();

  return (
    <div className="bg-white">
      <Header />
      <div className="px-spacing-regular-20">

        <SearchBar />

        <Table
          employees={ employees }
        />

        <div>

          {employees?.map((employee) => (
            <div key={ employee.id }>
              <p>{employee.photo}</p>
              <p>{employee.fullName}</p>
              <p>{employee.position}</p>
              <p>{employee.admission}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
