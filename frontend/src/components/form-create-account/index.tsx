import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Input from "../input";
import useField from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { userCreateAccount } from "../../redux/user";
import { useSelector } from "react-redux";
import { AppSelector } from "../../redux/configureStore";
import { addPageCreateAccountMessage } from "../../redux/page";
import Loading from "../loading";


const FormCreateAccount = () => {
  const navigate = useNavigate();

  const name = useField();
  const email = useField('email');
  const password = useField();
  const password_confirmation = useField();
  
  const dispatch = useDispatch();
  const { pageCreateAccountMessage, pageCreateAccountLoading } = useSelector((selector: AppSelector) => selector.page);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
 
    const fields =  [name, email, password, password_confirmation];

    let countValidated = 0;
    fields.forEach(field => field.validate() ? countValidated++ : countValidated);
    if (countValidated === fields.length) {

      if (password.value !== password_confirmation.value) {
        dispatch(addPageCreateAccountMessage('As senhas não correspondem'));
        setTimeout(() => {
          dispatch(addPageCreateAccountMessage(''));
        }, 800);
        return
      }


     const created = await dispatch(userCreateAccount({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      }));


      if (created) navigate('/login');
    }
  };

  if (pageCreateAccountLoading) return <Loading/>;

  return (
    <form className={styles.form}>
      <h1>Cadastrar-se</h1>
      <Input
        id="name"
        label="Nome"
        type="name"
        name="name"
        tip={name.tip}
        placeholder="Nome"
        value={name.value}
        onChange={e => name.setValue(e.target.value)}
      />

      <Input
        id="email"
        label="E-mail"
        type="email"
        tip={email.tip}
        name="email"
        placeholder="Email"
        value={email.value}
        onChange={e => email.setValue(e.target.value)}
      />

      <Input
        id="password"
        label="Senha"
        type="password"
        tip={password.tip}
        name="password"
        placeholder="Senha"
        value={password.value}
        onChange={e => password.setValue(e.target.value)}
      />

      <Input
        id="password_confirmation"
        label="Confirme a senha"
        type="password"
        tip={password_confirmation.tip}
        name="password_confirmation"
        placeholder="Senha"
        value={password_confirmation.value}
        onChange={e => password_confirmation.setValue(e.target.value)}
      />

      <button type="submit" onClick={handleSubmit}>
        Enviar
      </button>

      <p className={styles.tip}>
        { !!pageCreateAccountMessage && pageCreateAccountMessage }
      </p>

      <div className={styles.createAccount}>
        <p>Se já tiver uma conta, clique em</p>
        <button onClick={() => navigate('/login')}>Conectar-se</button>
      </div>
    </form>
  );
};

export default FormCreateAccount;
