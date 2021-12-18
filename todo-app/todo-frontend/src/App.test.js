import React from 'react';
import { Todo } from './Todos/List';
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

test('Simple test', () => {
  expect(0).toBe(0);
});


test('Can use todo component', () => {
  const todo = {
    text: "helloworld",
    done: false
  };

  const dummy = (todo) => {
    return null;
  }

  const { getByText } = render(<Todo todo={todo} onClickDelete={dummy} onClickComplete={dummy} />);

  expect(getByText('helloworld')).toBeInTheDocument();
  expect(getByText('This todo is not done')).toBeInTheDocument();
});