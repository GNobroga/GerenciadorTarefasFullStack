import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Tasks from "../../components/tasks";
import ModalListAdd from "../../components/modal-list-add";
import Alert from "../../components/alert";
import ModalListRemove from "../../components/modal-list-remove";
import ModalTaskAdd from "../../components/modal-task-add";
import { useSelector } from "react-redux";
import { AppSelector } from "../../redux/configureStore";


const Home = () => {

  const { listSelected } = useSelector((selector: AppSelector) => selector.page);

  return (
    <>

      <div className={`${styles.container} move`}>
        <Sidebar />
        <div className={styles.main}>
          {listSelected && <Header />}
          <div className={styles.tasks}>
            <Tasks />
          </div>
        </div>
      </div>
      <ModalTaskAdd/>
      <ModalListAdd/>
      <ModalListRemove/>
      <Alert/>
    </>
  );
};

export default Home;
