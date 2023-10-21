import React from 'react';
import styles from './styles.module.scss';

interface IProps extends React.ComponentProps<'input'> {
  id: string;
  label: string;
  tip: string;
}

const Input = ({id, label, tip, ...props}: IProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      <input id={id}{...props}/>
      <p className={styles.error}>{tip}</p>
    </div>
  );
}

export default Input