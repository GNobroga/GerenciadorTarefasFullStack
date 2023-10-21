import React from "react";
import styles from "./styles.module.scss";
import List from "../list";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppSelector } from "../../redux/configureStore";
import {
  makeSidenavInvisible,
  makeSidenavVisible,
  openAddListModal,
  setListEdit,
  setSearch,
} from "../../redux/page";
import { userLogout } from "../../redux/user";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showVisibleIcon, setShowVisibleIcon] = React.useState(false);
  const { sidenavVisibility } = useSelector(
    (selector: AppSelector) => selector.page,
  );
  const { data } = useSelector((selector: AppSelector) => selector.tasks);
  const { data: lists } = useSelector(
    (selector: AppSelector) => selector.lists,
  );
  const { listSelected } = useSelector(
    (selector: AppSelector) => selector.page,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const callback = () => {
      const { matches } = window.matchMedia("(max-width: 1050px)");
      setShowVisibleIcon(matches);
      if (!matches) {
        dispatch(makeSidenavVisible());
      }
    };

    callback();

    window.addEventListener("resize", callback);

    return () => window.removeEventListener("resize", callback);
  }, [dispatch]);

  if (!sidenavVisibility) return null;

  const onHidden = () => {
    dispatch(makeSidenavInvisible());
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!lists) return;
    const discovered = lists.lists.some((list: any) =>
        list.title.toLowerCase().includes(e.target.value.toLowerCase()));
 
    dispatch(setSearch({ search: e.target.value, discovered }));
  };

  const onLogout = () => {
    dispatch(userLogout());
    navigate('/login');
  }

  return (
    <aside className={styles.container}>
      <nav className={styles.header}>
        <h1>TO-DO-LIST</h1>
        <div className={styles.actions}>
          {data && showVisibleIcon && listSelected && (
            <img onClick={onHidden} src="invisible.png" alt="" />
          )}
          <img
            src="add-list.png"
            alt=""
            onClick={() => {
              dispatch(setListEdit(false));
              dispatch(openAddListModal());
            }}
          />
          <img src="exit.png" alt="" onClick={onLogout} />
        </div>
        <div className={styles.search}>
          <img src="search.png" alt="" width="30" height="30" />
          <input
            type="text"
            name="search"
            placeholder="Pesquisar..."
            onChange={onSearch}
          />
        </div>
      </nav>
      <List />
    </aside>
  );
};

export default Sidebar;
