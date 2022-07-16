import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Counter from './Counter';

afterEach(cleanup);

test('<Counter />', () => {
  // Renders component
  const { debug, getByTestId } = render(<Counter />);

  // find the button
  const counterBtn = getByTestId('counter-button');

  // debug(); // not needed to test, just handy

  // Asserts counter-button is a button
  expect(counterBtn.tagName).toBe('BUTTON');
  // Asserts counter-button starts at 0
  expect(counterBtn.textContent).toBe('0');

  // events
  fireEvent.click(counterBtn);
  // Asserts counter-button adds 1
  expect(counterBtn.textContent).toBe('1');

  // events
  fireEvent.click(counterBtn);
  // Asserts counter-button adds 1
  expect(counterBtn.textContent).toBe('2');

  // debug();
});
