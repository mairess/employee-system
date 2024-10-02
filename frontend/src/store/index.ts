import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import findAllUsersReducer from './findAllUsersSlice';
import findAllEmployeesReducer from './findAllEmployeesSlice';
import passwordChangeReducer from './passwordChangeSlice';
import modalPasswordChangeReducer from './modalPasswordChangeSlice';
import modalEditEmployeeReducer from './modalEditEmployeeSlice';
import modalCreateEmployeeReducer from './modalCreateEmployeeSlice';
import modalCreateUserReducer from './modalCreateUserSlice';
import modalEditUserReducer from './modalEditUserSlice';
import paginationReducer from './paginationSlice';
import sortReducer from './sortSlice';
import searchTermReducer from './searchTermSlice';
import createEmployeeReducer from './createEmployeeSlice';
import editEmployeeReducer from './editEmployeeSlice';
import editUserReducer from './editUserSlice';
import findLoggedUserReducer from './findLoggedUserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    findAllUsers: findAllUsersReducer,
    findAllEmployees: findAllEmployeesReducer,
    findLoggedUser: findLoggedUserReducer,
    passwordChange: passwordChangeReducer,
    modalPasswordChange: modalPasswordChangeReducer,
    modalEditEmployee: modalEditEmployeeReducer,
    modalCreateEmployee: modalCreateEmployeeReducer,
    modalCreateUser: modalCreateUserReducer,
    modalEditUser: modalEditUserReducer,
    pagination: paginationReducer,
    sort: sortReducer,
    searchTerm: searchTermReducer,
    createEmployee: createEmployeeReducer,
    editEmployee: editEmployeeReducer,
    editUser: editUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
