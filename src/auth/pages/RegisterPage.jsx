import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

import { startRegisterUserWithEmailPassword } from '../../store/auth';

const formValidations = {
  displayName: [
    value => !validator.isEmpty(value),
    'El nombre completo es requerido'
  ],
  email: [
    value => validator.isEmail(value),
    'Ingrese un correo electrónico válido'
  ],
  password: [
    value => validator.isLength(value, { min: 6 }),
    'Ingrese al menos 6 caracteres'
  ]
};

const formData = {
  displayName: '',
  email: '',
  password: ''
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    displayName,
    email,
    password,
    onInputChange,
    errors,
    isFormValid,
    formState
  } = useForm(formData, formValidations);

  const { status, errorMessage } = useSelector(state => state.auth);

  const onSubmit = e => {
    e.preventDefault();

    setIsFormSubmitted(true);

    if (!isFormValid) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 1500);
      return;
    }

    dispatch(startRegisterUserWithEmailPassword({ displayName, email, password }));
  };

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  return (
    <AuthLayout title='Crear cuenta'>
      <form className='auth-form animate__animated animate__fadeIn animate__faster' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='displayName'>Nombre completo</label>
          <input
            className={`form-control ${!!errors.displayName && isFormSubmitted ? 'is-invalid' : ''}`}
            id='displayName'
            name='displayName'
            onChange={onInputChange}
            placeholder='Ingresa tú nombre completo'
            type='displayName'
            value={displayName}
          />
          {isFormSubmitted && <small id='displayNameHelp' className='form-text text-danger'>{errors.displayName || null}</small>}

        </div>
        <div className='form-group'>
          <label htmlFor='email'>Correo electrónico</label>
          <input
            className={`form-control ${!!errors.email && isFormSubmitted ? 'is-invalid' : ''}`}
            id='email'
            name='email'
            onChange={onInputChange}
            placeholder='Ingresa tú correo electrónico'
            type='email'
            value={email}
          />
          {isFormSubmitted && <small id='emailHelp' className='form-text text-danger'>{errors.email || null}</small>}

        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className={`form-control ${!!errors.password && isFormSubmitted ? 'is-invalid' : ''}`}
            id='password'
            name='password'
            onChange={onInputChange}
            placeholder='Ingresa tú contraseña'
            type='password'
            value={password}
          />
          {isFormSubmitted && <small id='passwordHelp' className='form-text text-danger'>{errors.password || null}</small>}
        </div>
        <div className={`alert alert-danger ${errorMessage ? 'd-block' : 'd-none'}`} role="alert">
          {errorMessage}
        </div>
        <div className="text-right mb-2">
          <RouterLink to='/auth/login'>¿Ya tienes cuenta? Inicia sesión</RouterLink>
        </div>
        <button
          type='submit'
          disabled={isAuthenticating}
          className='btn btn-primary btn-block'
        >
          Iniciar sesión
        </button>
      </form>
    </AuthLayout>
  );
};
