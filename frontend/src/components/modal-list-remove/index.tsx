import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { AppSelector } from '../../redux/configureStore';
import { useDispatch } from 'react-redux';
import { addSelectedList, closeModals } from '../../redux/page';
import { deleteListItem } from '../../redux/lists';

const ModalListRemove = () => {

  const { removeListModalOpen, listSelected, blackList } = useSelector((selector: AppSelector) => selector.page);
  const dispatch = useDispatch();

  if (!removeListModalOpen) return null;

  const onDelete = async () => {

    if (listSelected) {
      await dispatch(deleteListItem((listSelected as any).id) as any);
      if (blackList && blackList.length) {
        blackList.forEach(async (l: any) => {
          await dispatch(deleteListItem(l.id) as any);
        });
      }
      dispatch(addSelectedList(null));
      dispatch(closeModals());
    }
  }

  return (
    <div className={`${styles.modal} fadeIn`}>
    <div className={styles.form}>
      <img src="icon-remove.png" alt="" />
      <h1>Você tem certeza?</h1>
      <p>Você realmente quer deletar esses registros? Este processo não poderá ser desfeito.</p>
      <div className={styles.actions}>
        <button onClick={() => dispatch(closeModals())}>Fechar</button>
        <button onClick={onDelete}>Deletar</button>
      </div>
    </div>
  </div>
  );
};

export default ModalListRemove;
