import React from "react";
import ListIcon from "../../utils/ListIcon";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { AppSelector } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import {
  addBlackList,
  addSelectedList,
  clearBlackList,
  removeBlackList,
} from "../../redux/page";
import { tasksFind } from "../../redux/tasks";

interface IProps {
  list: {
    id: number;
    title: string;
  };
}

const ListItem = ({ list }: IProps) => {
  const { listSelected, blackList } = useSelector(
    (selector: AppSelector) => selector.page,
  );
  const { data } = useSelector((selector: AppSelector) => selector.lists);
  const { objSearch } = useSelector((selector: AppSelector) => selector.page);
  const dispatch = useDispatch();

  if (
    objSearch.search.trim() &&
    !list.title.toLowerCase().includes(objSearch.search.toLowerCase())
  )
    return null;

  const isCurrentSelected = listSelected && listSelected.id === list.id;
  const isSelectedOnBlackList = blackList.find((l: any) => l.id === list.id);

  //console.log(listSelected, list.id)


  const onSelected = (e: React.MouseEvent) => {
    if (!data) return;

    if (e.ctrlKey && listSelected) {
      if (isSelectedOnBlackList) {
        dispatch(removeBlackList(list));
      } else {
        dispatch(addBlackList(list));
      }
    } else {
      if (isCurrentSelected) {
        dispatch(clearBlackList());
        dispatch(addSelectedList(null));
      } else {
        if (!isSelectedOnBlackList) {
          dispatch(addSelectedList(list));
          setTimeout(() => {
            dispatch(tasksFind(list.id));
          }, 50);
        }
      }
    }
  };


  const style = isCurrentSelected ? styles.selected :
    isSelectedOnBlackList ? styles.blacklist : '';

  return (
    <li
      className={`${styles.item}
      ${style}`}
      onClick={onSelected}
    >
      <ListIcon
        color={isSelectedOnBlackList || isCurrentSelected ? "white" : "black"}
      />
      <span className={styles.title}>{list.title}</span>
    </li>
  );
};

export default ListItem;
