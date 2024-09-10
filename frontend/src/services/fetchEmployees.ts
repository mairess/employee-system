const fetchEmployees = async (token: string) => {
  const response = await fetch('http://localhost:8080/employees', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default fetchEmployees;
