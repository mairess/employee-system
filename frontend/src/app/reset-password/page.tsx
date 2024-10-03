/* eslint-disable max-len */

'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import Button from '../../components/buttons/Button';

function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/password/reset?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Changed successfully',
        }).then(() => router.replace('/'));
      }
    } catch (error) {
      console.error('Error fetching:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-dark-neutral-800 via-dark-neutral-900 to-dark-neutral-1100 h-screen flex items-center justify-center"
    >

      <form
        className="flex flex-col gap-6 bg-light-neutral-100 border border-light-neutral-400 rounded-lg p-8 shadow-xl"
        onSubmit={ handleSubmit }
      >

        <h1
          className="font-bold text-center text-2xl text-light-neutral-900"
        >
          Reset Password
        </h1>

        <input
          className="rounded-xl px-3 py-2 text-black border border-light-neutral-400 bg-light-neutral-0 hover:border-dark-neutral-300 w-full"
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="Your new password"
          value={ newPassword }
          required
          onChange={ handlePasswordChange }
        />

        <Button
          loading={ loading }
          text="Reset password"
        />

      </form>

    </div>
  );
}

export default PasswordResetPage;
