/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import useEmployees from '../../hooks/useEmployees';

function Dashboard() {
  const { setError, error, loading, employees } = useEmployees();

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (<div>Error:{error}</div>);
  }

  return (
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
  );
}

export default Dashboard;
