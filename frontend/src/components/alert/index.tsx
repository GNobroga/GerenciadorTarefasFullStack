import React from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AppSelector } from '../../redux/configureStore';
import { closeShowAlert } from '../../redux/page';

const Alert = () => {

  const { showAlert } = useSelector((selector: AppSelector) => selector.page);
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (showAlert.open) {
      setTimeout(() => dispatch(closeShowAlert()), 1000);
    }
  }, [showAlert, dispatch]);

  if (!showAlert.open) return null;

  return (
    <div className={styles.modal}>
      <form className="fadeIn">
        <img src="happiness.png" alt="" />
        <h1>Tudo certo!</h1>
        <p>{showAlert.message  }</p>
        <button type="submit" onClick={e => {
          e.preventDefault();
          dispatch(closeShowAlert());
        }}>Fechar</button>
      </form>
    </div>
  );
};

export default Alert;