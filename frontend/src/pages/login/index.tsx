import React from 'react';
import styles from './styles.module.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FormCreateAccount from '../../components/form-create-account';
import FormLogin from '../../components/form-login';
import { useDispatch } from 'react-redux';
import { autoLogin } from '../../redux/user';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(autoLogin()).then(canLogin => canLogin && navigate('/'));
  }, [dispatch, navigate]);

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<FormLogin/>}/>
        <Route path="criar" element={<FormCreateAccount/>}/>
        <Route path="*" element={<div>Not found</div>}/>
      </Routes>
    </div>
  );

};

export default Login;