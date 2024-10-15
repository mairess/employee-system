type DeleteUserProps = {
  token: string;
  userId: number | null;
};

const deleteUser = async ({ token, userId }: DeleteUserProps) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
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

export default deleteUser;
