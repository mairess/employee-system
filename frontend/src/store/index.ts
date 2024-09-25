import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import findAllUsersReducer from './findAllUsersSlice';
import findAllEmployeesReducer from './findAllEmployeesSlice';
import passwordChangeReducer from './passwordChangeSlice';
import modalPasswordChangeReducer from './modalPasswordChangeSlice';
import paginationReducer from './paginationSlice';
import sortReducer from './sortSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    findAllUsers: findAllUsersReducer,
    findAllEmployees: findAllEmployeesReducer,
    passwordChange: passwordChangeReducer,
    modalPasswordChange: modalPasswordChangeReducer,
    pagination: paginationReducer,
    sort: sortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
