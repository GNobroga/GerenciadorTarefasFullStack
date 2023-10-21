import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { AppSelector } from '../../redux/configureStore';
import { useDispatch } from 'react-redux';
import { addSelectedList, makeSidenavVisible, openAddListModal, openAddTaskModal, removeListModalOpen, setListEdit } from '../../redux/page';

const Header = () => {

  const { sidenavVisibility, listSelected } = useSelector((selector: AppSelector) => selector.page);
  const dispatch = useDispatch();

  const onShow = () => {
    dispatch(makeSidenavVisible());
  }

  if (!listSelected) return null;

  return (
    <div className={styles.container}>
      <h1>{ listSelected.title }</h1>
      <div className={styles.actions}>
        { !sidenavVisibility && <img onClick={onShow} src="show.png" alt="" />}
        <img src="edit.png" alt="" onClick={() => {
          dispatch(setListEdit(true));
          dispatch(openAddListModal());
        }}/>
        <img src="add-task.png" alt="" onClick={() => dispatch(openAddTaskModal())}/>
        <img src="trash.png" alt="" onClick={() => dispatch(removeListModalOpen())} />
        <img src="close-list.png" alt="" onClick={() => dispatch(addSelectedList(null))} />
      </div>
    </div>
  );
};

export default Header;