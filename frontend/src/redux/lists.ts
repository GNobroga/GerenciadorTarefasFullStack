import { createSlice } from '@reduxjs/toolkit';
import { addSelectedList } from './page';


const slice = createSlice({
  name: 'lists',
  initialState: {
    data: null,
    loading: false,
    error: null,
  } as any,
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

export const findAllLists: any = (id: number, token: string) => async dispatch => {
  try {
    await dispatch(fetchStarted());
    const req = await fetch(`http://localhost:8080/api/lists/user?user_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      cache: 'no-cache',
    });
    const json = await req.json();

    if (!req.ok) {
      throw new Error(`Não foi possível carregar as listas deste usuário.`)
    }

    console.log(json)

    dispatch(fetchSuccess(json));

    return req.ok;
  } catch (e) {
    dispatch(fetchError(e))
  }
}

interface IRecord {
  title: string;
  user_id: string;
}

export const createList: any = (list: IRecord) => async (dispatch, getState) => {
  try {
    const token = getState().token.data?.token;

    if (!token) {
      throw new Error('O token não está presente.');
    }

    const req = await fetch('http://localhost:8080/api/lists', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(list),
    });

    const json = await req.json();

    if (!req.ok) {
      throw new Error('Não foi possível criar a lista.');
    }

    return req.ok;

  } catch (e) {
    if (e instanceof Error) throw e;
  }

  return false;
};

export const deleteListItem = (id: number) => async (dispatch, getState) => {
  try {
    const token = getState().token.data?.token;
    const user_id = getState().user.data.user.id;

    dispatch(fetchStarted());
    const req = await fetch(`http://localhost:8080/api/lists/${id}`, {
      headers: { Authorization: `Bearer ${token}`},
      method: 'DELETE',
    });

    if (!req.ok) throw new Error('Não foi possível deletar essa lista.');

    setTimeout(async () => {
      await dispatch(findAllLists(user_id, token));
    }, 50)

  } catch (e) {
    if (e instanceof Error) {
      dispatch(fetchError(e.message));
    }
   
  }
}


export const listEditFetch = (id: number, title: string) => async (dispatch, getState) => {
  try {
    const token = getState().token.data?.token;
    const user_id = getState().user.data.user?.id;


    dispatch(fetchStarted());

    const req = await fetch(`http://localhost:8080/api/lists/${id}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({ title }),
    });

    if (!req.ok) throw new Error('Não foi possível editar a lista.');

   dispatch(addSelectedList(await req.json()));



    await dispatch(findAllLists(user_id, token));

  


  } catch (e) {
    
    //
   
  }
}




export default slice.reducer;