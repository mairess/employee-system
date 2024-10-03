type DeleteEmployeeProps = {
  token: string;
  employeeId: number | null;
};

const deleteEmployee = async ({ token, employeeId }: DeleteEmployeeProps) => {
  try {
    const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching:', errorData.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching:', error);
    return null;
  }
};

export default deleteEmployee;
