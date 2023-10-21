import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import lists from './lists';
import tasks from './tasks';
import user from './user';
import page from './page';
import token from './token';

const localStorageMiddleware = store => next => action => {
  if (action.meta) {
   switch (action.meta) {
    case 'set-local':
      window.localStorage.setItem('token', JSON.stringify(action.payload));
      break;
    case 'delete-local':
      window.localStorage.removeItem('token');
      break;
   }
  }
  return next(action);
}

const reducer = combineReducers({ lists, tasks, user, page, token });
const store = configureStore({ reducer, middleware: [...getDefaultMiddleware(), localStorageMiddleware] });

export type AppSelector = ReturnType<typeof store.getState>;

export default store;