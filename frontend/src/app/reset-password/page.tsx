/* eslint-disable max-len */

'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8080/password/reset?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
    });

    if (response.ok) {
      alert('Password has been changed!');
    } else {
      const errorData = await response.json();
      alert(`Failed to reset password: ${errorData.message}`);
    }
  };

  return (
    <div
      className="bg-slate-300 h-screen flex items-center justify-center"
    >
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-xs"
        onSubmit={ handleSubmit }
      >
        <h1
          className="text-xl text-black font-bold mb-4"
        >
          Reset Password
        </h1>

        <label
          htmlFor="newPassword"
          className="block text-sm font-medium mb-2 text-black"
        >
          Your new password
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
          onChange={ handlePasswordChange }
          type="password"
          name="newPassword"
          id="newPassword"
          value={ newPassword }
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default PasswordResetPage;
