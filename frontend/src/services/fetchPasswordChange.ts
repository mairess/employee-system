type FetchPasswordChangeProps = {
  email: string,
};

const fetchPasswordChange = async ({ email }: FetchPasswordChangeProps) => {
  const response = await fetch('http://localhost:8080/password/reset-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return response;
};

export default fetchPasswordChange;
