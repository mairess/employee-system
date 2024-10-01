/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout } from '../store/authSlice';
import { AppDispatch } from '../store';
import useToken from '../hooks/useToken';
import getTokenSubject from '../utils/getTokenSubject';
import { UserType } from '../types';

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserType>();
  const [username, setUsername] = useState<string>();
  const router = useRouter();
  const token = useToken();

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  useEffect(() => {
    if (token !== null) {
      const tokenSubject = getTokenSubject(token);
      const subject = tokenSubject?.sub;
      setUsername(subject);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;
      const response = await fetch(`http://localhost:8080/users/find?username=${username}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching:', errorData.message);
        return;
      }

      const userData = await response.json();

      setUser(userData);
    };

    fetchData();
  }, [token, username]);

  if (!token) return null;

  return (
    <header className="flex items-center justify-between text-black w-full shadow-custom-10 p-spacing-little-12">

      <h1 className="text-h1 text-primary">ES.</h1>

      <div
        className="flex items-center gap-2"
      >

        <img
          className="border rounded-full border-secondary"
          src={ user?.photo }
          alt={ user?.fullName }
          width={ 50 }
          height={ 50 }
        />

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
