import React from 'react';

const validations = {
  email: {
    matches: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: 'Por favor, insira um endereço de e-mail válido.',
  },
  password: {
    matches: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    message: 'A senha deve conter pelo menos 8 caracteres, um dígito, uma letra minúscula e uma letra maiúscula.'
  },
  default: {
    message: 'Este campo não pode estar vazio.',
  },
};

type IFieldType = 'email' | 'password' | 'default';

const applyValidation = (value: string, type?: IFieldType) => {
  if (!value.length) {
    return validations.default.message;
  } 
  
  if (type === 'email' && !validations.email.matches.test(value)) {
    return validations.email.message;
  }

  if (type === 'password' && !validations.password.matches.test(value)) {
    return validations.password.message;
  }

  return '';
  
}

const useField = (type?: IFieldType, noRequired = false, initial?: string) => {
  const [value, setValue] = React.useState<string>(initial ?? '');
  const [tip, setTip] = React.useState<string>('');
  const [dirty, setDirty] = React.useState<boolean>(false);

  const validate = React.useCallback(() => {
    if (noRequired) return true;
    const validation = applyValidation(value, type);
    setDirty(true);
    setTip(tip);
    return validation === '';
  }, [value, type, tip, noRequired]);

  React.useEffect(() => {
    if (noRequired) return;
    if (value.length) setDirty(true);
    if (!dirty) return;
    const validation = applyValidation(value, type);
    setTip(validation);

  }, [tip, value, type, dirty, noRequired]);


  return { value, setValue, validate, tip, setDirty };

};

export default useField;