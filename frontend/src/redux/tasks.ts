import { ThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppSelector } from "./configureStore";

interface IState {
  data: any;
  loading: boolean;
  error: Error | null;
}


const slice = createSlice({
  name: 'tasks',
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
    deleteTask(state, action) {
      state.data = state.data.filter(task => task.id !== action.payload.id);
      state.loading = false;
      state.error = null;
    }
  },
});

export const{ fetchStarted, fetchSuccess, fetchError, deleteTask } = slice.actions;

interface ICreateTask {
  list_id: number;
  title: string;
  description?: string;
  done?: boolean;
  estimation: string;
}

export const taskCreate: (task: ICreateTask) => any = (task: ICreateTask) => async (dispatch, getState) => {
  try {

    const token = getState().token.data?.token;

    const req = await fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json', },
      body: JSON.stringify(task),
    });


    const json = await req.json();


    console.log(json)
    if (!req.ok) {
      throw new Error('Ocorre um erro ao criar a lista.');
    }

    return req.ok;

  } catch (e) {
    //
  }
}

export const tasksFind: (id: number) => any = (id: number) => async (dispatch, getState) => {
  try {

    const token = getState().token.data?.token;

    dispatch(fetchStarted());

    const req = await fetch(`http://localhost:8080/api/tasks/list?list_id=${id}`, {
      headers: { Authorization: `Bearer ${token}`},
    });


    if (!req.ok) {
      throw new Error('Não foi possível buscar as tarefas.');
    }
    
    const json = await req.json();


    dispatch(fetchSuccess(json));

  } catch (e) {
    dispatch(fetchError((e as Error).message))
  }
};


interface IEditTask {
  id: number;
  title?: string;
  description?: string;
  estimation?: string;
  done?: boolean;
}



// CreateAsyncThunk requires three generic arguments (return, param) 
export const editTask = createAsyncThunk('tasks/editTask',
 async ({id, estimation, ...task}: IEditTask, thunkApi) => {

  const { token }  = (thunkApi.getState() as AppSelector).token.data as { token: string;};


  const req = await fetch(`http://localhost:8080/api/tasks/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
    body: JSON.stringify(task),
  });


  const json = await req.json();

  console.log(json);
  
  return req.ok;
  

});

export const removeTask = createAsyncThunk('tasks/taskRemove', async (id: number, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const { token } = (getState() as AppSelector).token.data as { token: string; };
  const req = await fetch(`http://localhost:8080/api/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}`},
  })

  return req.ok;
})

export default slice.reducer;