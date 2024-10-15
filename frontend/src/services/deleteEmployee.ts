/* eslint-disable max-len */
type DeleteEmployeeProps = {
  token: string;
  employeeId: number | null;
};

const deleteEmployee = async ({ token, employeeId }: DeleteEmployeeProps) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeId}`, {
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
