import { configureStore } from '@reduxjs/toolkit';
import authReducer from './loginSlice';
import userReducer from './userSlice';
import usersReducer from './listUsersSlice';
import listEmployeesReducer from './listEmployeesSlice';
import passwordChangeReducer from './passwordChangeSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    employees: listEmployeesReducer,
    password: passwordChangeReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
