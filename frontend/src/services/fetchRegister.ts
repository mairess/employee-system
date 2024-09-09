/* eslint-disable max-len */
type FetchRegisterProps = {
  fullName: string,
  username: string,
  email: string,
  password: string,
  role: string,
};

const fetchRegister = async ({ fullName, username, email, password, role }: FetchRegisterProps) => {
  const response = await fetch('http://localhost:8080/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullName, username, email, password, role }),
  });

  return response;
};

export default fetchRegister;
