import React from "react";
import styles from "./styles.module.scss";
import ListIcon from "../../utils/ListIcon";
import ListItem from "../list-item";
import { useSelector } from "react-redux";
import { AppSelector } from "../../redux/configureStore";

///* //<ListItem/> */

interface IList {
  title: string;
  id: number;
}

const List = () => {
  const { data } = useSelector((selector: AppSelector) => selector.lists);
  const { objSearch } = useSelector((selector: AppSelector) => selector.page);

  const lists = data?.lists ?? [];
  const hasData = lists && lists.length > 0;

  return (
    <div className={styles.wrapper}>
      {(!hasData || (!objSearch.discovered && objSearch.search)) && (
        <p className={styles.notFound}>Não há nenhuma lista.</p>
      )}
   
      <div className={styles.scroll}>
        <ul className={styles.list}>
          {lists.map((list: IList) => (
            <ListItem key={list.id} list={list} />
          ))}
        </ul>
      </div>
  
    </div>
  );
};

export default List;
