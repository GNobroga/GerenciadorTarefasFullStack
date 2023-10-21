import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'token',
  initialState: {
    data: (() => {
      let token = window.localStorage.getItem('token');
      if (token) {
        token = JSON.parse(token);
      }
      return (token ?? null) as { token: string; } | null;
    })(),
    loading: false,
    error: null,
  },
  reducers: {
    fetchStarted(state) {
      state.data = null;
      state.loading = true;
      state.error = null;
    },
    
    fetchSuccess: {
      reducer: (state, action) => { 
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      },
      prepare(payload) {
        return { payload, meta: 'set-local' } as any;
      },
    },
    fetchError(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    removeToken: {
      reducer(state) {
        state.data = null;
        state.loading = false;
        state.error = null;
      },
      prepare() {
        return { meta: 'delete-local'} as any;
      }
    }
  },
});

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const { removeToken } = slice.actions;

interface IUser {
  email: string;
  password: string;
}

export const fetchToken: any = ({ email, password }: IUser) => async dispatch => {
  try {
    dispatch(fetchStarted())
    const req = await fetch('http://localhost:8080/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ email, password }),
    });

    const data = await req.json();


    if (!req.ok) {
      throw new Error();
    }

    return dispatch(fetchSuccess(data));
  } catch (e) { 
    dispatch(fetchError('Usuário ou senha incorretos.'));
  }
}

export default slice.reducer;