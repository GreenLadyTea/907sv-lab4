import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';
import { ACTION_TYPES, initialState, SELECTOR_TYPES } from '../../store';

const dispatch = jest.fn();

test('Отображает поле ввода, при вводе в которое осуществляется фильтрация по подстроке', () => {
  const field = 's';
  render(<Filter dispatch={dispatch} state={initialState} />);
  const searchbar = screen.getByTestId('search-bar');
  expect(searchbar).toBeInTheDocument();
  expect(dispatch).not.toBeCalledWith({
    type: ACTION_TYPES.SEARCH,
    payload: ''
  });
  fireEvent.input(searchbar, { target: { value: field } });
  expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.SEARCH, payload: field });
});

test('Фильтр отображает варианты фильтрации', () => {
  render(<Filter dispatch={dispatch} state={initialState} />);
  const options = [SELECTOR_TYPES.ALL, SELECTOR_TYPES.DONE, SELECTOR_TYPES.NOT_DONE];
  for (let i = 0; i < options.length; i++) {
    expect(screen.getByText(options[i])).toBeInTheDocument();
  }
});

test('При выборе варианта фильтрации вызывается dispatch с экшеном filter', () => {
  render(<Filter dispatch={dispatch} state={initialState} />);
  const done = screen.getByText(SELECTOR_TYPES.DONE);
  expect(dispatch).not.toBeCalledWith({
    type: ACTION_TYPES.FILTER,
    payload: SELECTOR_TYPES.DONE
  });
  fireEvent.click(done);
  expect(dispatch).toBeCalledWith({
    type: ACTION_TYPES.FILTER,
    payload: SELECTOR_TYPES.DONE
  });
});
