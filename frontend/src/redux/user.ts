import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { addPageCreateAccountLoading, addPageCreateAccountMessage, addSelectedList, removeSelectList } from './page';
import { findAllLists } from './lists';
import { removeToken } from './token';

interface IState {
  data: any;
  loading: boolean;
  error: string | null;
}

const slice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  } as IState,
  reducers: {
    fetchStarted(state) {
      state.data = null;
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchError(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const userLogout: any = () => dispatch => {
  dispatch(removeToken());
  dispatch(fetchSuccess(null));
};

export const userLogin: any = (token: string) => async dispatch => {
  try {
    dispatch(fetchStarted());
    const req = await fetch(`http://localhost:8080/api/users`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(addSelectedList(null));
    
    if (!req.ok) {
      dispatch(removeToken());
      throw new Error('Usuário não encontrado.');
    }

    const json = await req.json();

    const { payload: { user: { id } } } = await dispatch(fetchSuccess(json));
    await dispatch(findAllLists(id, token));

    return req.ok;
  } catch (e) {
    const message = (<Error>e).message;
    dispatch(fetchError(message))

  }
  return false;
}

interface IUserRegister {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const userCreateAccount: (record: IUserRegister) => any = (record: IUserRegister) => async dispatch => {
  try {
    dispatch(addPageCreateAccountLoading(true));
    const req = await fetch(`http://localhost:8080/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });


    if (!req.ok) {
      throw new Error('Usuário já cadastrado');
    }

    return req.ok;
  } catch (e: Error | any) {

    dispatch(addPageCreateAccountMessage(e.message));
  } finally {
    dispatch(addPageCreateAccountLoading(false));
  }

  setTimeout(() => {
    dispatch(addPageCreateAccountMessage(''));
  }, 500);

  return false;
};

export const autoLogin: any = () => async (dispatch, getState) => {
  try {

    const token = getState().token.data?.token;

    if (token) {
      return await dispatch(userLogin(token));
    }

  } catch (e) {
    //
  }

  return false;
};

export default slice.reducer;