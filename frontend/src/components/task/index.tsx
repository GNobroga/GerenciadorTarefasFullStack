import React from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { editTask, removeTask, tasksFind } from "../../redux/tasks";

interface IProps {
  id: number;
  list_id: number;
  title: string;
  estimation: string;
  createdAt: string;
  done: boolean;
  description: string;
}

const dateFormat = (value: string) => {
  return new Date(value).toLocaleDateString();
};

const getExpirationDate = (value: string) => {
  const t1 = new Date();
  const t2 = new Date(value);
  t1.setUTCHours(0, 0, 0, 0);
  t2.setUTCHours(0, 0, 0, 0);
  return t1.getTime() > t2.getTime();
};

const Task = ({
  id,
  list_id,
  title,
  estimation,
  description,
  createdAt,
  done: _done,
}: IProps) => {
  const [done, setDone] = React.useState(_done);
  const [currentDescription, setCurrentDescription] =
    React.useState(description);

  const dispatch = useDispatch();

  const isExpired = getExpirationDate(estimation);

  const isNotExpiredAndDone = !isExpired && !done;

  const currentStyle = isExpired ? styles.expired : done ? styles.done : "";

  const onSave = async function () {
    await dispatch(
      editTask({
        id,
        title,
        description: currentDescription,
        estimation,
        done,
      }) as any,
    );
    dispatch(tasksFind(list_id));
  };

  const onRemove = async () => {
    await dispatch(removeTask(id) as any);
    dispatch(tasksFind(list_id));
  };

  const onDone = async () => {
    setDone(true);
    await dispatch(editTask({ id, done: true }) as any);
    await dispatch(tasksFind(list_id));
  };

  return (
    <li className={`${styles.item} ${currentStyle}`}>
      <div className={styles.mark}>
        {isNotExpiredAndDone && (
          <input type="checkbox" checked={done} onChange={onDone} />
        )}
        <h1>{title}</h1>
      </div>
      <div className={styles.actions}>
        {isNotExpiredAndDone && (
          <img src="salvar-arquivo.png" alt="" onClick={onSave} />
        )}
        <img src="remove.png" alt="" onClick={onRemove} />
      </div>
      <textarea
        className={styles.info}
        placeholder={
          !isNotExpiredAndDone ? "Não há nada escrito." : "Escreva..."
        }
        value={currentDescription}
        onChange={
          isNotExpiredAndDone
            ? (e) => setCurrentDescription(e.target.value)
            : () => {}
        }
      ></textarea>
      <div className={styles.details}>
        <p>Criação: {dateFormat(createdAt)}</p>
        <p>Previsão: {dateFormat(estimation)}</p>
      </div>
    </li>
  );
};

export default Task;
