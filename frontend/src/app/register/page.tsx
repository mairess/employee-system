/* eslint-disable max-len */

'use client';

import { Provider } from 'react-redux';
import FormRegister from '../../components/FormRegister';
import store from '../../store';

function RegisterPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-dark-neutral-800 via-dark-neutral-900 to-dark-neutral-1100"
    >
      <Provider store={ store }>
        <FormRegister />
      </Provider>
    </div>
  );
}

export default RegisterPage;
