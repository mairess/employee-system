import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import findAllUsersReducer from './findAllUsersSlice';
import findAllEmployeesReducer from './findAllEmployeesSlice';
import passwordChangeReducer from './passwordChangeSlice';
import modalReducer from './modalSlice';
import paginationReducer from './paginationSlice';
import sortReducer from './sortSlice';
import searchTermReducer from './searchTermSlice';
import createEmployeeReducer from './createEmployeeSlice';
import editEmployeeReducer from './editEmployeeSlice';
import findLoggedUserReducer from './findLoggedUserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    findAllUsers: findAllUsersReducer,
    findAllEmployees: findAllEmployeesReducer,
    findLoggedUser: findLoggedUserReducer,
    passwordChange: passwordChangeReducer,
    modal: modalReducer,
    pagination: paginationReducer,
    sort: sortReducer,
    searchTerm: searchTermReducer,
    createEmployee: createEmployeeReducer,
    editEmployee: editEmployeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
