import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import employeesReducer from './employeesSlice';
import passwordChangeReducer from './passwordChangeSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    employees: employeesReducer,
    password: passwordChangeReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
