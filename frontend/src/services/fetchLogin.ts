type FetchLoginProps = {
  username: string,
  password: string,
};

const fetchLogin = async ({ username, password }: FetchLoginProps) => {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return response;
};

export default fetchLogin;
