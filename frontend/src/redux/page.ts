import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'page',
  initialState: {
    sidenavVisibility: true,
    pageCreateAccountMessage: '',
    pageCreateAccountLoading: false,
    addTaskModalOpen: false,
    addListModalOpen: false,
    removeListModalOpen: false,
    successOperationModal: false,
    listSelected: null,
    showAlert: {
      open: false,
      message: '',
    },
    objSearch: {
      search: '',
      discovered: false,
    },
    blackList: [],
    listEdit: false,
  } as any,
  reducers: {
    makeSidenavVisible(state) {
      state.sidenavVisibility = true;
    },
    makeSidenavInvisible(state) {
      state.sidenavVisibility = false;
    },
    addPageCreateAccountMessage(state, action) {
      state.pageCreateAccountMessage = action.payload;
    },
    addPageCreateAccountLoading(state, action) {
      state.pageCreateAccountLoading = action.payload;
    },
    openAddTaskModal(state) {
      state.addTaskModalOpen = true;
      state.addListModalOpen = false;
      state.removeListModalOpen = false;
      state.successOperationModal = false;
    },
    openAddListModal(state) {
      state.addTaskModalOpen = false;
      state.addListModalOpen = true;
      state.removeListModalOpen = false;
      state.successOperationModal = false;
    },
    removeListModalOpen(state) {
      state.addTaskModalOpen = false;
      state.addListModalOpen = false;
      state.removeListModalOpen = true;
      state.successOperationModal = false;
    },
    openSuccessOperationModal(state) {
      state.addTaskModalOpen = false;
      state.addListModalOpen = false;
      state.removeListModalOpen = false;
      state.successOperationModal = true;
    },
    closeModals(state) {
      state.addTaskModalOpen = false;
      state.addListModalOpen = false;
      state.removeListModalOpen = false;
      state.successOperationModal = false;
    },
    addSelectedList(state, action) {
      state.listSelected = action.payload;
    },
    removeSelectList(state) {
      state.listSelected = null;
    },
    addBlackList(state, action) {
      return {
        ...state,
        blackList: [...state.blackList, action.payload, ],
      }
    },
    removeBlackList(state, action) {
      return {
        ...state,
        blackList: state.blackList.filter(list => list.id !== action.payload.id),
      }
    },
    clearBlackList(state) {
      return {
        ...state,
        blackList: [],
      }
    },
    setSearch(state, { payload }) {
      state.objSearch = payload;
    },
    setListEdit(state, action) {
      state.listEdit = action.payload;
    },
    closeShowAlert(state) {
      state.showAlert.open = false;
      state.showAlert.message = '';
    },
    openShowAlert(state, action) {
      state.showAlert.open = true;
      state.showAlert.message = action.payload;
    }
  },
});

export const { 
  makeSidenavVisible, 
  makeSidenavInvisible, 
  addPageCreateAccountMessage, 
  addPageCreateAccountLoading ,
  openAddTaskModal,
  openAddListModal,
  removeListModalOpen,
  openSuccessOperationModal,
  closeModals,
  addSelectedList,
  removeSelectList,
  addBlackList,
  removeBlackList,
  clearBlackList,
  setSearch,
  setListEdit,
  closeShowAlert,
  openShowAlert,
} = slice.actions;

export default slice.reducer;