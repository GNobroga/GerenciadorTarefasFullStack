import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { AppSelector } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { closeModals, openShowAlert } from "../../redux/page";
import useField from "../../hooks/useForm";
import { createList, findAllLists, listEditFetch } from "../../redux/lists";


const ModalListAdd = () => {
  const { addListModalOpen, listEdit, listSelected } = useSelector(
    (selector: AppSelector) => selector.page,
  );

  const token = useSelector((selector: AppSelector) => selector.token);

  const user = useSelector((selector: AppSelector) => selector.user);

  const dispatch = useDispatch();

  const { value, setValue, ...title} = useField();

  React.useEffect(() => {
    if (listEdit && listSelected) {
      setValue(() => listSelected.title || '');
    } else {
      setValue(() => '');
    }
  }, [listEdit, listSelected, setValue, addListModalOpen]);



  if (!addListModalOpen) return null;


  const onAddList = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user.data || !token.data) return;

    const id = user.data.user.id;
    const pass = (token.data as any).token;

    if (title.validate()) {
      const createdList = await dispatch(
        createList({ user_id: id, title: value }),
      );

      if (createdList) {
        setTimeout(async () => {
          await dispatch(findAllLists(id, pass));
        }, 50);

        dispatch(closeModals());
        title.setDirty(false);
        dispatch(openShowAlert('Lista adicionada com sucesso!'));
      }
    }
  };

  const onEditList: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (title.validate()) {
      await dispatch(listEditFetch(listSelected.id, value) as any);
      dispatch(closeModals());
    }
  };

  const onClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(closeModals());
  };

  return (
    <div className={`${styles.modal} fadeIn`}>
      <form className={styles.form}>
        <div className={styles.title}>
          <h1>{listEdit ? "Editar lista" : "Adicionar uma lista"}</h1>
        </div>

        <div className={styles.wrapper}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}   
            name="title"
            id="title"
            placeholder="Atividades..."
            autoFocus
          />
          {/* <span>{title.tip}</span> */}
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onClose}>
            Fechar
          </button>
          <button
            className={styles.saveButton}
            type="submit"
            onClick={listEdit ? onEditList : onAddList}
          >
            <img src="save.png" alt="" />
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalListAdd;
