/* eslint-disable max-len */

'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout } from '../store/authSlice';
import { AppDispatch, RootState } from '../store';
import useToken from '../hooks/useToken';
import getTokenSubject from '../utils/getTokenSubject';
import findLoggedUser from '../services/findLoggedUser';
import Loading from './Loading';

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.findLoggedUser);
  const [username, setUsername] = useState<string>();
  const router = useRouter();
  const token = useToken() || '';

  useEffect(() => {
    if (token !== null) {
      const tokenSubject = getTokenSubject(token);
      const subject = tokenSubject?.sub;
      setUsername(subject);
    }
  }, [token]);

  useEffect(() => {
    if (username) {
      dispatch(findLoggedUser({ token, username }));
    }
  }, [dispatch, token, username]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  if (!token) return null;

  return (
    <header className="flex items-center justify-between text-black w-full shadow-custom-10 p-spacing-little-12">

      <h1 className="text-h1 text-primary">ES.</h1>

      <div
        className="flex items-center gap-2"
      >
        {loading ? <Loading /> : (
          <img
            className="border rounded-full border-secondary"
            src={ user?.photo }
            alt={ user?.fullName }
            width={ 50 }
            height={ 50 }
          />
        )}

        <div
          className="flex flex-col text-sm"
        >

          <p>
            {user?.fullName.split(' ')[0]}
          </p>

          <button
            onClick={ handleLogout }
            className="text-link hover:text-link-hover p-0 m-0 underline"
          >
            Logout
          </button>

        </div>

      </div>

    </header>

  );
}

export default Header;
