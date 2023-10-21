import React from "react";
import styles from "./styles.module.scss";
import Task from "../task";
import { useSelector } from "react-redux";
import { AppSelector } from "../../redux/configureStore";
import { ITask } from "../../models/Task";
import Loading from "../loading";

//<Task />

const getExpirationDate = (value: string) => {
  const t1 = new Date();
  const t2 = new Date(value);
  t1.setUTCHours(0, 0, 0, 0);
  t2.setUTCHours(0, 0, 0, 0);
  return t1.getTime() > t2.getTime();
};

const sortPerTaskDoneOrExpired = (tasks: ITask[]) => {
  return [...tasks].sort((x, y) => {
    const v1: number = x.done ? 1 : 0;
    const v2: number = y.done ? 1 : 0;
    if (v1 > v2) {
      return 1;
    } else if (v1 < v2) {
      return -1;
    } else {
      return 0;
    }
  }).sort((x, y) => {
    const v1 = getExpirationDate(x.estimation) ? 1 : 0;
    const v2 = getExpirationDate(y.estimation) ? 1 : 0;
    if (v1 > v2) {
      return 1;
    } else if (v1 < v2) {
      return -1;
    } else {
      return 0;
    }
  });
};

const Tasks = () => {

  const  { data, loading } = useSelector((selector: AppSelector) => selector.tasks);
  const  { listSelected } = useSelector((selector: AppSelector) => selector.page);



  if (!listSelected) {
    return (
      <div className={styles.scroll}>
        <div className={styles.notFound}>Não há uma lista selecionada.</div>
      </div>
    );
  }

  const tasks = data && sortPerTaskDoneOrExpired((data.tasks as Array<ITask>));
  const hasData = tasks && tasks.length > 0;
  
  return (
    <div className={styles.scroll}>
      { hasData &&  
      <ul className={styles.list}>
        {tasks.map(task => <Task key={task.id} {...task}/>)}
      </ul>}
      { !hasData && <div className={styles.notFound}>Não há nenhuma tarefa.</div>}
    </div>
  );
};

export default Tasks;
