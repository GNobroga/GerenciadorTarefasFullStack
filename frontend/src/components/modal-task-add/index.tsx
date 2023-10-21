import React from "react";
import styles from "./styles.module.scss";
import { closeModals, openShowAlert } from "../../redux/page";
import { useSelector, useDispatch } from "react-redux";
import { AppSelector } from "../../redux/configureStore";
import useField from "../../hooks/useForm";
import { taskCreate, tasksFind } from "../../redux/tasks";

const ModalTaskAdd = () => {

  const { addTaskModalOpen, listSelected } = useSelector(
    (selector: AppSelector) => selector.page,
  );
  const dispatch = useDispatch();
  const { setValue: setTitle , ...title} = useField();
  const { setValue: setEstimation , ...estimation} = useField();
  const { setValue: setDescription , ...description} = useField("default", true);

  React.useEffect(() => {
    return () => {
      setTitle(() => '');
      setEstimation(() => '');
      setDescription(() => '');
    };
  }, [addTaskModalOpen, setTitle, setEstimation, setDescription]);

  if (!addTaskModalOpen) return null;

  const onCloseRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(closeModals());
  };

  const onAddRequest = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!listSelected) return;
    const list_id = listSelected.id;
    const isValid = [title, estimation, description].every((field) =>
      field.validate(),
    );

    if (isValid) {
      
      const created = await dispatch(
        taskCreate({
          list_id,
          title: title.value,
          estimation: estimation.value,
          description: description.value,
        }),
      );

      if (created) {
        setTimeout(() => {
          dispatch(tasksFind(list_id as number));
        }, 50);
        dispatch(closeModals());
        console.log('Entrou aqui')
        dispatch(openShowAlert('Tarefa adicionada com sucesso.'));
      }
    }
  };

  return (
    <div className={`${styles.modal} fadeIn`}>
      <form className={styles.container}>
        <div className={styles.header}>
          <h1>Cadastrar Tarefa</h1>
        </div>
        <div className={styles.wrapper}>
          <label htmlFor="">Título*</label>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={title.value}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles.wrapper}>
            <label htmlFor="">Estimação*</label>
            <input
              type="date"
              name="estimation"
              value={estimation.value}
              onChange={(e) => setEstimation(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <label htmlFor="">Descrição</label>
          <textarea
            name="description"
            placeholder="Escreva..."
            value={description.value}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.actions}>
          <button className={styles.remove} onClick={onCloseRequest}>
            Fechar
          </button>
          <button className={styles.add} onClick={onAddRequest}>
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalTaskAdd;
