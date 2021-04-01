import React, { FormEvent, useState } from 'react';
import './Form.css';
import { ACTION_TYPES } from '../../store';
import { useDispatch } from 'react-redux';

export default function Form() {
  const [field, setField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  function handleSubmitInner(e: FormEvent) {
    e.preventDefault();
    if (field !== '') {
      dispatch({ type: ACTION_TYPES.ADD, payload: field });
      setField('');
      setErrorMessage('');
    } else {
      setErrorMessage('Поле не должно быть пустым!');
    }
  }

  return (
    <>
      <form data-testid="form" onSubmit={handleSubmitInner}>
        <input data-testid="input" value={field} onChange={e => setField(e.target.value)} />
        <button data-testid="button" type="submit">
          Добавить
        </button>
        <div className="errorMessage">{errorMessage}</div>
      </form>
    </>
  );
}
