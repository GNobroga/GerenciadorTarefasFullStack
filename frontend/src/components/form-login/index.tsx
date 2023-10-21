import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import useField from "../../hooks/useForm";
import Input from "../input";
import { useDispatch } from "react-redux";
import { fetchToken } from "../../redux/token";
import { useSelector } from "react-redux";
import { AppSelector } from "../../redux/configureStore";
import Loading from "../loading";
import { userLogin } from "../../redux/user";

const FormLogin = () => {
  const navigate = useNavigate();

  const email = useField("email");

  const password = useField();

  const dispatch = useDispatch();

  const { error, loading } = useSelector(
    (selector: AppSelector) => selector.token,
  );

  const handleSubmitForm = async (e: React.MouseEvent) => {
    e.preventDefault();
 

    let countValidated = 0;

    const fields = [email, password];

    fields.forEach((field) =>
      field.validate() ? countValidated++ : countValidated,
    );

    if (countValidated == fields.length) {
     
      const data = await dispatch(
        fetchToken({ email: email.value, password: password.value }),
      );

      const token = data?.payload?.token as string;

      const isLoginSuccess = await dispatch(userLogin(token));

      if (isLoginSuccess) {
        navigate("/");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <form className={styles.form}>
      <h1>Login</h1>

      <Input
        tip={email.tip}
        value={email.value}
        onChange={(e) => email.setValue(e.target.value)}
        id="email"
        label="E-mail"
        type="email"
        name="email"
        placeholder="Email"

      />

      <Input
        tip={password.tip}
        onChange={(e) => password.setValue(e.target.value)}
        value={password.value}
        id="password"
        label="Senha"
        type="password"
        name="password"
        placeholder="Senha"

      />

      <button type="submit" onClick={handleSubmitForm}>
        Entrar
      </button>
      <p className={styles.error}>{error ? error : null}</p>
      <div className={styles.createAccount}>
        <p>Ainda não tem conta?</p>
        <button onClick={() => navigate('criar')}>Cadastra-se</button>
      </div>
    </form>
  );
};

export default FormLogin;
