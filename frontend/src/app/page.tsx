/* eslint-disable max-len */

'use client';

import { Provider } from 'react-redux';
import FormLogin from '../components/FormLogin';
import store from '../store';

function LoginPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-dark-neutral-800 via-dark-neutral-900 to-dark-neutral-1100"
    >
      <Provider store={ store }>
        <FormLogin />
      </Provider>
    </div>
  );
}

export default LoginPage;
