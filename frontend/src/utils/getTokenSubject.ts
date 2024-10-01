import jwt from 'jsonwebtoken';

const getTokenSubject = (token: string) => {
  try {
    const payload = jwt.decode(token);
    return payload;
  } catch (error) {
    console.error('Error decoding:', error);
    return null;
  }
};

export default getTokenSubject;
